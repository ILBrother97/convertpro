'use client'

import { useState, useCallback, useId } from 'react'
import { PDFDocument } from 'pdf-lib'
import { DropZone } from '@/components/tools/DropZone'
import { FileList } from '@/components/tools/FileList'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { DownloadButton } from '@/components/tools/DownloadButton'

type FileItem = { id: string; file: File }
type State = { phase: 'idle' } | { phase: 'converting'; progress: number } | { phase: 'done'; url: string; size: number }

export default function ImageToPdfTool() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [state, setState] = useState<State>({ phase: 'idle' })
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Original'>('A4')
  const uid = useId()

  const handleFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...newFiles.map((f) => ({ id: `${uid}-${Math.random()}`, file: f })),
    ])
  }, [uid])

  const removeFile = (id: string) => setFiles((p) => p.filter((f) => f.id !== id))
  const moveUp = (id: string) => setFiles((p) => {
    const i = p.findIndex((f) => f.id === id)
    if (i <= 0) return p
    const next = [...p]; [next[i - 1], next[i]] = [next[i], next[i - 1]]; return next
  })
  const moveDown = (id: string) => setFiles((p) => {
    const i = p.findIndex((f) => f.id === id)
    if (i >= p.length - 1) return p
    const next = [...p]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; return next
  })

  const convert = async () => {
    if (files.length === 0) return
    setState({ phase: 'converting', progress: 5 })
    const pdf = await PDFDocument.create()

    for (let i = 0; i < files.length; i++) {
      const { file } = files[i]
      const bytes = await file.arrayBuffer()
      let img
      if (file.type === 'image/jpeg') img = await pdf.embedJpg(bytes)
      else img = await pdf.embedPng(bytes)

      let w: number, h: number
      if (pageSize === 'A4') { w = 595.28; h = 841.89 }
      else if (pageSize === 'Letter') { w = 612; h = 792 }
      else { w = img.width; h = img.height }

      const page = pdf.addPage([w, h])
      const scale = Math.min(w / img.width, h / img.height)
      const drawW = img.width * scale
      const drawH = img.height * scale
      page.drawImage(img, { x: (w - drawW) / 2, y: (h - drawH) / 2, width: drawW, height: drawH })
      setState({ phase: 'converting', progress: Math.round(((i + 1) / files.length) * 95) })
    }

    const pdfBytes = await pdf.save()
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
    setState({ phase: 'done', url: URL.createObjectURL(blob), size: blob.size })
  }

  const reset = () => { setFiles([]); setState({ phase: 'idle' }) }

  return (
    <div className="space-y-6">
      {state.phase !== 'done' && state.phase !== 'converting' && (
        <>
          <DropZone accept="image/jpeg,image/png,image/webp" multiple maxSizeMB={20} onFiles={handleFiles}
            label="Drop images here" sublabel="JPG, PNG, WebP · Multiple files allowed" />
          <FileList files={files} onRemove={removeFile} onMoveUp={moveUp} onMoveDown={moveDown} />
          {files.length > 0 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
                <div className="flex gap-3">
                  {(['A4', 'Letter', 'Original'] as const).map((s) => (
                    <button key={s} onClick={() => setPageSize(s)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${pageSize === s ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button id="convert-btn" onClick={convert} className="w-full btn-primary justify-center py-4 text-base">
                📄 Create PDF ({files.length} image{files.length > 1 ? 's' : ''})
              </button>
            </>
          )}
        </>
      )}

      {state.phase === 'converting' && (
        <div className="py-8 space-y-4 animate-fade-in">
          <ProgressBar percent={state.progress} label="Building PDF…" />
        </div>
      )}

      {state.phase === 'done' && (
        <div className="flex justify-center py-4">
          <DownloadButton href={state.url} filename="images.pdf" fileSize={state.size} onReset={reset} />
        </div>
      )}
    </div>
  )
}
