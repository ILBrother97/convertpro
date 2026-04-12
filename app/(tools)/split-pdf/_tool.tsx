'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { DropZone } from '@/components/tools/DropZone'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { DownloadButton } from '@/components/tools/DownloadButton'
import { parsePageRange } from '@/lib/utils'

type State =
  | { phase: 'idle' }
  | { phase: 'ready'; file: File; pageCount: number }
  | { phase: 'converting'; progress: number }
  | { phase: 'done'; url: string; size: number }
  | { phase: 'error'; message: string }

export default function SplitPdfTool() {
  const [state, setState] = useState<State>({ phase: 'idle' })
  const [rangeInput, setRangeInput] = useState('1')

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0]
    try {
      const bytes = await file.arrayBuffer()
      const doc = await PDFDocument.load(bytes)
      setState({ phase: 'ready', file, pageCount: doc.getPageCount() })
      setRangeInput(`1-${doc.getPageCount()}`)
    } catch {
      setState({ phase: 'error', message: 'Could not read this PDF. It may be encrypted or corrupted.' })
    }
  }, [])

  const handleSplit = async () => {
    if (state.phase !== 'ready') return
    setState({ phase: 'converting', progress: 20 })
    try {
      const bytes = await state.file.arrayBuffer()
      const src = await PDFDocument.load(bytes)
      const pages = parsePageRange(rangeInput, state.pageCount)
      if (pages.length === 0) { setState({ phase: 'error', message: 'No valid pages found. Check your range.' }); return }

      setState({ phase: 'converting', progress: 50 })
      const out = await PDFDocument.create()
      const copied = await out.copyPages(src, pages.map((p) => p - 1))
      copied.forEach((p) => out.addPage(p))

      setState({ phase: 'converting', progress: 90 })
      const pdfBytes = await out.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      setState({ phase: 'done', url: URL.createObjectURL(blob), size: blob.size })
    } catch (err) {
      setState({ phase: 'error', message: err instanceof Error ? err.message : 'Split failed' })
    }
  }

  const reset = () => setState({ phase: 'idle' })

  return (
    <div className="space-y-6">
      {state.phase === 'idle' && (
        <DropZone accept="application/pdf,.pdf" maxSizeMB={50} onFiles={handleFiles} label="Drop your PDF here" sublabel="Only one PDF at a time" />
      )}
      {state.phase === 'ready' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">{state.file.name}</span>
            <span className="text-xs text-indigo-600 font-semibold">{state.pageCount} pages</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extract pages</label>
            <input id="page-range-input" type="text" value={rangeInput} onChange={(e) => setRangeInput(e.target.value)}
              placeholder="e.g. 1-3, 5, 7-9"
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <p className="text-xs text-gray-400 mt-1">Use ranges like 1-3 or individual pages like 1, 3, 5</p>
          </div>
          <button id="split-btn" onClick={handleSplit} className="w-full btn-primary justify-center py-4 text-base">
            ✂️ Split PDF
          </button>
        </div>
      )}
      {state.phase === 'converting' && (
        <div className="py-8 space-y-4 animate-fade-in">
          <ProgressBar percent={state.progress} label="Splitting PDF…" />
        </div>
      )}
      {state.phase === 'done' && (
        <div className="flex justify-center py-4">
          <DownloadButton href={state.url} filename="split.pdf" fileSize={state.size} onReset={reset} />
        </div>
      )}
      {state.phase === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center animate-fade-in">
          <p className="text-red-700 font-medium mb-3">{state.message}</p>
          <button onClick={reset} className="text-sm text-red-600 underline">Try again</button>
        </div>
      )}
    </div>
  )
}
