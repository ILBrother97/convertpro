'use client'

import { useState, useCallback } from 'react'
import { DropZone } from '@/components/tools/DropZone'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { DownloadButton } from '@/components/tools/DownloadButton'

type State =
  | { phase: 'idle' }
  | { phase: 'ready'; file: File }
  | { phase: 'converting'; percent: number }
  | { phase: 'done'; downloadUrl: string; fileName: string; fileSize?: number }
  | { phase: 'error'; message: string }

type Props = {
  toolSlug: string
  accept: string
  maxSizeMB?: number
  options?: Record<string, string | number | boolean>
  dropLabel?: string
  dropSublabel?: string
  extraOptionsUI?: React.ReactNode
}

export function CloudConvertTool({
  toolSlug,
  accept,
  maxSizeMB = 50,
  options = {},
  dropLabel,
  dropSublabel,
  extraOptionsUI,
}: Props) {
  const [state, setState] = useState<State>({ phase: 'idle' })

  const handleFiles = useCallback((files: File[]) => {
    if (files[0]) setState({ phase: 'ready', file: files[0] })
  }, [])

  const handleConvert = async () => {
    if (state.phase !== 'ready') return
    const file = state.file

    setState({ phase: 'converting', percent: 5 })

    try {
      // Read file as base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          resolve(result.split(',')[1])
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Start job
      const startRes = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: toolSlug,
          fileBase64: base64,
          fileName: file.name,
          options,
        }),
      })

      if (!startRes.ok) {
        const err = await startRes.json()
        throw new Error(err.error ?? 'Failed to start conversion')
      }

      const { jobId } = await startRes.json()

      // Poll for status
      let attempts = 0
      const maxAttempts = 60

      while (attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 2000))
        attempts++

        const pollRes = await fetch(`/api/convert?jobId=${jobId}`)
        const data = await pollRes.json()

        if (data.status === 'done') {
          setState({
            phase: 'done',
            downloadUrl: data.downloadUrl,
            fileName: data.fileName,
            fileSize: data.fileSize,
          })
          return
        }

        if (data.status === 'error') {
          throw new Error(data.message ?? 'Conversion failed')
        }

        setState({ phase: 'converting', percent: Math.min(95, data.percent ?? 10 + attempts * 5) })
      }

      throw new Error('Conversion timed out. Please try again.')
    } catch (err) {
      setState({
        phase: 'error',
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
      })
    }
  }

  const reset = () => setState({ phase: 'idle' })

  return (
    <div className="space-y-6">
      {/* Idle / Ready */}
      {(state.phase === 'idle' || state.phase === 'ready') && (
        <>
          <DropZone
            accept={accept}
            maxSizeMB={maxSizeMB}
            onFiles={handleFiles}
            label={dropLabel}
            sublabel={dropSublabel}
          />

          {state.phase === 'ready' && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{state.file.name}</p>
              </div>
            </div>
          )}

          {extraOptionsUI && state.phase === 'ready' && (
            <div className="animate-fade-in">{extraOptionsUI}</div>
          )}

          <button
            id="convert-btn"
            onClick={handleConvert}
            disabled={state.phase !== 'ready'}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-base"
          >
            {state.phase === 'ready' ? '⚡ Convert Now' : 'Select a file to continue'}
          </button>
        </>
      )}

      {/* Converting */}
      {state.phase === 'converting' && (
        <div className="flex flex-col items-center gap-6 py-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <div className="w-full">
            <ProgressBar percent={state.percent} label="Converting your file…" />
          </div>
          <p className="text-sm text-gray-500">This usually takes a few seconds. Please wait.</p>
        </div>
      )}

      {/* Done */}
      {state.phase === 'done' && (
        <div className="flex justify-center py-6">
          <DownloadButton
            href={state.downloadUrl}
            filename={state.fileName}
            fileSize={state.fileSize}
            onReset={reset}
          />
        </div>
      )}

      {/* Error */}
      {state.phase === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-fade-in">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="font-semibold text-red-800 mb-1">Conversion failed</p>
          <p className="text-sm text-red-600 mb-4">{state.message}</p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
