'use client'

import { useState, useCallback } from 'react'
import imageCompression from 'browser-image-compression'
import { DropZone } from '@/components/tools/DropZone'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { formatBytes, getSavingsBadge } from '@/lib/utils'

type State =
  | { phase: 'idle' }
  | { phase: 'ready'; file: File; preview: string }
  | { phase: 'compressing'; progress: number }
  | { phase: 'done'; original: File; compressed: Blob; url: string }

export default function CompressImageTool() {
  const [state, setState] = useState<State>({ phase: 'idle' })
  const [quality, setQuality] = useState(80)

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setState({ phase: 'ready', file, preview })
  }, [])

  const handleCompress = async () => {
    if (state.phase !== 'ready') return
    const file = state.file

    setState({ phase: 'compressing', progress: 0 })

    const compressed = await imageCompression(file, {
      maxSizeMB: (file.size * (quality / 100)) / (1024 * 1024),
      useWebWorker: true,
      onProgress: (p) => setState({ phase: 'compressing', progress: p }),
    })

    const url = URL.createObjectURL(compressed)
    setState({ phase: 'done', original: file, compressed, url })
  }

  const reset = () => setState({ phase: 'idle' })

  return (
    <div className="space-y-6">
      {(state.phase === 'idle' || state.phase === 'ready') && (
        <>
          <DropZone
            accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
            maxSizeMB={20}
            onFiles={handleFiles}
            label="Drop your image here"
            sublabel="JPG, PNG, WebP, GIF, BMP supported"
          />

          {state.phase === 'ready' && (
            <>
              {/* Quality slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Compression Quality</label>
                  <span className="text-sm font-bold text-indigo-600">{quality}%</span>
                </div>
                <input
                  id="quality-slider"
                  type="range"
                  min={20}
                  max={95}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={state.preview} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                <div>
                  <p className="font-medium text-gray-800 text-sm truncate max-w-xs">{state.file.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Original: {formatBytes(state.file.size)}</p>
                </div>
              </div>

              <button
                id="compress-btn"
                onClick={handleCompress}
                className="w-full btn-primary justify-center py-4 text-base"
              >
                🗜️ Compress Image
              </button>
            </>
          )}
        </>
      )}

      {state.phase === 'compressing' && (
        <div className="py-8 space-y-4 animate-fade-in">
          <ProgressBar percent={state.progress} label="Compressing…" />
          <p className="text-sm text-gray-500 text-center">Using your browser — no upload needed</p>
        </div>
      )}

      {state.phase === 'done' && (
        <div className="space-y-6 animate-fade-in">
          {/* Before/after */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Before</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(state.original)} alt="original" className="mx-auto max-h-48 rounded-lg object-contain" />
              <p className="font-bold text-gray-900 mt-3">{formatBytes(state.original.size)}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">After</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={state.url} alt="compressed" className="mx-auto max-h-48 rounded-lg object-contain" />
              <p className="font-bold text-green-700 mt-3">{formatBytes(state.compressed.size)}</p>
              <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mt-1">
                {getSavingsBadge(state.original.size, state.compressed.size)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href={state.url}
              download={`compressed_${state.original.name}`}
              className="btn-primary px-10 py-3.5 text-base"
            >
              ⬇️ Download Compressed Image
            </a>
            <button onClick={reset} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors underline">
              Compress another image
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
