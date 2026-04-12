'use client'

import { useState, useCallback } from 'react'
import { DropZone } from '@/components/tools/DropZone'
import { DownloadButton } from '@/components/tools/DownloadButton'

type State =
  | { phase: 'idle' }
  | { phase: 'ready'; file: File; preview: string; naturalW: number; naturalH: number }
  | { phase: 'converting' }
  | { phase: 'done'; url: string; filename: string; size: number }

export default function ResizeImageTool() {
  const [state, setState] = useState<State>({ phase: 'idle' })
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [lockAspect, setLockAspect] = useState(true)

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      setState({ phase: 'ready', file, preview, naturalW: img.naturalWidth, naturalH: img.naturalHeight })
      setWidth(String(img.naturalWidth))
      setHeight(String(img.naturalHeight))
    }
    img.src = preview
  }, [])

  const handleWidthChange = (val: string) => {
    setWidth(val)
    if (lockAspect && state.phase === 'ready' && Number(val) > 0) {
      const ratio = state.naturalH / state.naturalW
      setHeight(String(Math.round(Number(val) * ratio)))
    }
  }

  const handleHeightChange = (val: string) => {
    setHeight(val)
    if (lockAspect && state.phase === 'ready' && Number(val) > 0) {
      const ratio = state.naturalW / state.naturalH
      setWidth(String(Math.round(Number(val) * ratio)))
    }
  }

  const handleResize = async () => {
    if (state.phase !== 'ready') return
    const w = Number(width)
    const h = Number(height)
    if (!w || !h || w <= 0 || h <= 0) return
    setState({ phase: 'converting' })

    const bitmap = await createImageBitmap(state.file)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0, w, h)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Failed'))),
        'image/jpeg',
        0.92
      )
    })

    const baseName = state.file.name.replace(/\.[^.]+$/, '')
    const url = URL.createObjectURL(blob)
    setState({ phase: 'done', url, filename: `${baseName}_${w}x${h}.jpg`, size: blob.size })
  }

  const reset = () => setState({ phase: 'idle' })

  return (
    <div className="space-y-6">
      {(state.phase === 'idle' || state.phase === 'ready') && (
        <>
          <DropZone accept="image/*" maxSizeMB={20} onFiles={handleFiles} label="Drop your image here" />
          {state.phase === 'ready' && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={state.preview} alt="preview" className="w-20 h-20 object-cover rounded-lg" />
                <div className="text-sm text-gray-600">
                  Original: <span className="font-semibold text-gray-900">{state.naturalW} × {state.naturalH} px</span>
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-5 gap-3 items-end">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                  <input id="width-input" type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div className="col-span-1 flex justify-center pb-1">
                  <button onClick={() => setLockAspect((v) => !v)} title="Lock aspect ratio"
                    className={`p-2 rounded-lg border transition-colors ${lockAspect ? 'bg-indigo-100 border-indigo-300 text-indigo-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                    🔗
                  </button>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                  <input id="height-input" type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
              </div>
              {lockAspect && <p className="text-xs text-indigo-600 flex items-center gap-1">🔗 Aspect ratio locked</p>}

              <button id="resize-btn" onClick={handleResize} className="w-full btn-primary justify-center py-4 text-base">
                📐 Resize Image
              </button>
            </div>
          )}
        </>
      )}

      {state.phase === 'converting' && (
        <div className="flex flex-col items-center gap-4 py-10 animate-fade-in">
          <div className="w-14 h-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-gray-600 font-medium">Resizing in browser…</p>
        </div>
      )}

      {state.phase === 'done' && (
        <div className="flex justify-center py-4">
          <DownloadButton href={state.url} filename={state.filename} fileSize={state.size} onReset={reset} />
        </div>
      )}
    </div>
  )
}
