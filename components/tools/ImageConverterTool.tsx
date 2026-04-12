'use client'

import { useState, useCallback } from 'react'
import { DropZone } from '@/components/tools/DropZone'
import { DownloadButton } from '@/components/tools/DownloadButton'

type ConversionState =
  | { phase: 'idle' }
  | { phase: 'ready'; file: File; preview: string }
  | { phase: 'converting' }
  | { phase: 'done'; url: string; filename: string; size: number }

type Props = {
  fromMime: string
  toMime: string
  fromLabel: string
  toExt: string
  quality?: number
  accept: string
}

export function ImageConverterTool({ fromMime, toMime, fromLabel, toExt, quality = 0.92, accept }: Props) {
  const [state, setState] = useState<ConversionState>({ phase: 'idle' })

  const handleFiles = useCallback((files: File[]) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setState({ phase: 'ready', file, preview })
  }, [])

  const handleConvert = async () => {
    if (state.phase !== 'ready') return
    const file = state.file
    setState({ phase: 'converting' })

    try {
      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bitmap, 0, 0)

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Conversion failed'))),
          toMime,
          quality
        )
      })

      const baseName = file.name.replace(/\.[^.]+$/, '')
      const filename = `${baseName}.${toExt}`
      const url = URL.createObjectURL(blob)
      setState({ phase: 'done', url, filename, size: blob.size })
    } catch {
      setState({ phase: 'idle' })
    }
  }

  const reset = () => setState({ phase: 'idle' })

  return (
    <div className="space-y-6">
      {(state.phase === 'idle' || state.phase === 'ready') && (
        <>
          <DropZone
            accept={accept}
            maxSizeMB={20}
            onFiles={handleFiles}
            label={`Drop your ${fromLabel} here`}
            sublabel={`Click to browse your ${fromLabel} files`}
          />
          {state.phase === 'ready' && (
            <>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex gap-4 items-center animate-fade-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={state.preview} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">{state.file.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{fromMime} → {toMime}</p>
                </div>
              </div>
              <button id="convert-btn" onClick={handleConvert} className="w-full btn-primary justify-center py-4 text-base">
                ⚡ Convert Now
              </button>
            </>
          )}
        </>
      )}

      {state.phase === 'converting' && (
        <div className="flex flex-col items-center gap-4 py-10 animate-fade-in">
          <div className="w-14 h-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-gray-600 font-medium">Converting in your browser…</p>
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
