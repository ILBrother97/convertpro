export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function mimeToExt(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  }
  return map[mime] ?? 'bin'
}

export function extToMime(ext: string): string {
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    pdf: 'application/pdf',
    txt: 'text/plain',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }
  return map[ext.toLowerCase()] ?? 'application/octet-stream'
}

export function getSavingsBadge(original: number, compressed: number): string {
  if (original === 0) return '0%'
  const savings = ((original - compressed) / original) * 100
  return `-${Math.round(savings)}% smaller`
}

export function parsePageRange(input: string, maxPages: number): number[] {
  const pages: number[] = []
  const parts = input.split(',').map((p) => p.trim())
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number)
      for (let i = start; i <= end && i <= maxPages; i++) {
        if (i >= 1) pages.push(i)
      }
    } else {
      const n = Number(part)
      if (n >= 1 && n <= maxPages) pages.push(n)
    }
  }
  return Array.from(new Set(pages)).sort((a, b) => a - b)
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}

export function estimateReadingTime(wordCount: number): string {
  const wpm = 200
  const minutes = Math.ceil(wordCount / wpm)
  if (minutes < 1) return '< 1 min read'
  return `${minutes} min read`
}
