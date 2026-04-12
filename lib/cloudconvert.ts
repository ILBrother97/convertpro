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

  const res = await fetch(`${CC_BASE}/jobs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? 'CloudConvert job creation failed')
  }

  const data = await res.json()
  return data.data.id as string
}

export async function getJobStatus(jobId: string): Promise<CloudConvertJobStatus> {
  const res = await fetch(`${CC_BASE}/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
    },
  })

  if (!res.ok) return { status: 'error', message: 'Failed to fetch job status' }

  const data = await res.json()
  const job = data.data

  if (job.status === 'error') {
    return { status: 'error', message: job.tasks?.find((t: { status: string; message?: string }) => t.status === 'error')?.message ?? 'Conversion failed' }
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

  // Calculate rough progress from tasks
  const tasks: Array<{ status: string }> = job.tasks ?? []
  const done = tasks.filter((t) => t.status === 'finished').length
  const total = tasks.length
  const percent = total > 0 ? Math.round((done / total) * 100) : 20

  return { status: 'processing', percent }
}
