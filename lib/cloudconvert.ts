export type ConversionConfig = {
  operation: string
  input_format: string
  output_format?: string
  ocr?: boolean
  video_codec?: string
  crf?: number
  audio_bitrate?: string
}

export const CONVERSION_MAP: Record<string, ConversionConfig> = {
  'pdf-to-word':    { operation: 'convert',  input_format: 'pdf',  output_format: 'docx' },
  'word-to-pdf':    { operation: 'convert',  input_format: 'docx', output_format: 'pdf'  },
  'compress-pdf':   { operation: 'optimize', input_format: 'pdf' },
  'pdf-to-jpg':     { operation: 'convert',  input_format: 'pdf',  output_format: 'jpg'  },
  'pdf-ocr':        { operation: 'convert',  input_format: 'pdf',  output_format: 'pdf', ocr: true },
  'image-to-text':  { operation: 'convert',  input_format: 'jpg',  output_format: 'txt', ocr: true },
  'mp4-to-mp3':     { operation: 'convert',  input_format: 'mp4',  output_format: 'mp3' },
  'compress-video': { operation: 'convert',  input_format: 'mp4',  output_format: 'mp4', video_codec: 'x264', crf: 28 },
}

export type CloudConvertJobStatus = {
  status: 'processing' | 'done' | 'error'
  percent?: number
  downloadUrl?: string
  fileName?: string
  fileSize?: number
  message?: string
}

const CC_BASE = 'https://api.cloudconvert.com/v2'

/**
 * Gets all available CloudConvert API keys from environment variables.
 * Supports up to 5 keys for failover redundancy.
 */
function getApiKeys(): string[] {
  const keys = [
    process.env.CLOUDCONVERT_API_KEY,
    process.env.CLOUDCONVERT_API_KEY_2,
    process.env.CLOUDCONVERT_API_KEY_3,
    process.env.CLOUDCONVERT_API_KEY_4,
    process.env.CLOUDCONVERT_API_KEY_5,
  ].filter((k): k is string => !!k)
  
  return keys
}

export async function createJob(
  tool: string,
  fileBase64: string,
  fileName: string,
  options: Record<string, string | number | boolean> = {}
): Promise<string> {
  const config = CONVERSION_MAP[tool]
  if (!config) throw new Error(`Unknown tool: ${tool}`)

  const convertTask: Record<string, unknown> = {
    operation: config.operation,
    input: 'import-task',
    input_format: config.input_format,
    ...(config.output_format ? { output_format: config.output_format } : {}),
    ...(config.ocr ? { ocr: true, language: (options.language as string) ?? 'eng' } : {}),
    ...(config.video_codec ? { video_codec: options.video_codec ?? config.video_codec } : {}),
    ...(config.crf !== undefined ? { crf: options.crf ?? config.crf } : {}),
    ...(config.output_format === 'mp3' && options.audio_bitrate
      ? { audio_bitrate: options.audio_bitrate }
      : {}),
  }

  const payload = {
    tasks: {
      'import-task': {
        operation: 'import/base64',
        file: fileBase64,
        filename: fileName,
      },
      'convert-task': convertTask,
      'export-task': {
        operation: 'export/url',
        input: 'convert-task',
      },
    },
  }

  const keys = getApiKeys()
  let lastError = 'No API keys configured'

  // Failover loop: Try every key until success
  for (const key of keys) {
    try {
      const res = await fetch(`${CC_BASE}/jobs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()
        return data.data.id as string
      }

      const err = await res.json()
      lastError = err.message ?? 'Unknown error'
      
      // If error is related to credits or auth, continue to next key
      if (res.status === 402 || res.status === 401) {
        console.warn(`CloudConvert Key failed (Status ${res.status}). Trying next key...`)
        continue
      }
      
      // If it's a structural error (bad file, etc), don't retry
      throw new Error(lastError)
    } catch (e) {
      if (e instanceof Error && (e.message.includes('402') || e.message.includes('401'))) {
        continue
      }
      throw e
    }
  }

  throw new Error(`All conversion slots are currently busy. Error: ${lastError}`)
}

export async function getJobStatus(jobId: string): Promise<CloudConvertJobStatus> {
  const keys = getApiKeys()
  let lastRes: Response | null = null

  // We need to find which key was used for this jobId, or just try them all
  // Since jobId is unique to an account, we try until we get a 200 OK
  for (const key of keys) {
    const res = await fetch(`${CC_BASE}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })

    if (res.ok) {
      const data = await res.json()
      const job = data.data

      if (job.status === 'error') {
        return { 
          status: 'error', 
          message: job.tasks?.find((t: { status: string; message?: string }) => t.status === 'error')?.message ?? 'Conversion failed' 
        }
      }

      if (job.status === 'finished') {
        const exportTask = job.tasks?.find((t: { operation: string; status: string; result?: { files?: Array<{ url: string; filename: string; size: number }> } }) => t.operation === 'export/url' && t.status === 'finished')
        const file = exportTask?.result?.files?.[0]
        return {
          status: 'done',
          downloadUrl: file?.url,
          fileName: file?.filename,
          fileSize: file?.size,
        }
      }

      const tasks: Array<{ status: string }> = job.tasks ?? []
      const done = tasks.filter((t) => t.status === 'finished').length
      const total = tasks.length
      const percent = total > 0 ? Math.round((done / total) * 100) : 20

      return { status: 'processing', percent }
    }
    
    lastRes = res
  }

  return { status: 'error', message: 'Failed to find job across all configured accounts.' }
}
