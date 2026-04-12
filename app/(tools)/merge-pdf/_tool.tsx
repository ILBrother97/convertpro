'use client'

import { useState, useCallback, useId } from 'react'
import { PDFDocument } from 'pdf-lib'
import { DropZone } from '@/components/tools/DropZone'
import { FileList } from '@/components/tools/FileList'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { DownloadButton } from '@/components/tools/DownloadButton'
import { formatBytes } from '@/lib/utils'

type FileItem = { id: string; file: File }
type State = { phase: 'idle' } | { phase: 'converting'; progress: number } | { phase: 'done'; url: string; size: number }

export default function MergePdfTool() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [state, setState] = useState<State>({ phase: 'idle' })
  const uid = useId()

  const handleFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const combined = [...prev, ...newFiles.map((f) => ({ id: `${uid}-${Math.random()}`, file: f }))]
      return combined.slice(0, 20)
    })
  }, [uid])

  const removeFile = (id: string) => setFiles((p) => p.filter((f) => f.id !== id))
  const moveUp = (id: string) => setFiles((p) => { const i = p.findIndex((f) => f.id === id); if (i <= 0) return p; const n = [...p]; [n[i-1],n[i]]=[n[i],n[i-1]]; return n })
  const moveDown = (id: string) => setFiles((p) => { const i = p.findIndex((f) => f.id === id); if (i >= p.length-1) return p; const n = [...p]; [n[i],n[i+1]]=[n[i+1],n[i]]; return n })

  const merge = async () => {
    if (files.length < 2) return
    setState({ phase: 'converting', progress: 5 })
    const merged = await PDFDocument.create()

    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].file.arrayBuffer()
      const src = await PDFDocument.load(bytes)
      const pageIndices = src.getPageIndices()
      const pages = await merged.copyPages(src, pageIndices)
      pages.forEach((p) => merged.addPage(p))
      setState({ phase: 'converting', progress: Math.round(((i + 1) / files.length) * 95) })
    }

    const pdfBytes = await merged.save()
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
    setState({ phase: 'done', url: URL.createObjectURL(blob), size: blob.size })
  }

  const reset = () => { setFiles([]); setState({ phase: 'idle' }) }
  const totalSize = files.reduce((acc, { file }) => acc + file.size, 0)

  return (
    <div className="space-y-6">
      {state.phase !== 'done' && state.phase !== 'converting' && (
        <>
          <DropZone accept="application/pdf,.pdf" multiple maxSizeMB={50} onFiles={handleFiles}
            label="Drop PDF files here" sublabel={`Up to 20 PDFs · ${files.length}/20 added`} />
          <FileList files={files} onRemove={removeFile} onMoveUp={moveUp} onMoveDown={moveDown} />
          {files.length >= 2 && (
            <div className="flex flex-col gap-3">
              <div className="text-sm text-gray-500 text-center">
                {files.length} PDFs · {formatBytes(totalSize)} total
              </div>
              <button id="merge-btn" onClick={merge} className="w-full btn-primary justify-center py-4 text-base">
                🔗 Merge {files.length} PDFs
              </button>
            </div>
          )}
          {files.length === 1 && <p className="text-sm text-amber-600 text-center">Add at least one more PDF to merge</p>}
        </>
      )}
      {state.phase === 'converting' && (
        <div className="py-8 space-y-4 animate-fade-in">
          <ProgressBar percent={state.progress} label="Merging PDFs…" />
        </div>
      )}
      {state.phase === 'done' && (
        <div className="flex justify-center py-4">
          <DownloadButton href={state.url} filename="merged.pdf" fileSize={state.size} onReset={reset} />
        </div>
      )}
    </div>
  )
}
