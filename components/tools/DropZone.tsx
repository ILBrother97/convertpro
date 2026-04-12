'use client'

import { useCallback, useRef, useState } from 'react'
import { formatBytes } from '@/lib/utils'
import { CloudUpload, AlertCircle } from 'lucide-react'

type Props = {
  accept: string
  multiple?: boolean
  maxSizeMB?: number
  onFiles: (files: File[]) => void
  label?: string
  sublabel?: string
}

export function DropZone({
  accept,
  multiple = false,
  maxSizeMB = 50,
  onFiles,
  label = 'Drop your file here',
  sublabel,
}: Props) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileCount, setFileCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback(
    (files: File[]) => {
      const maxBytes = maxSizeMB * 1024 * 1024
      const acceptMimes = accept
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      for (const file of files) {
        if (file.size > maxBytes) {
          setError(`"${file.name}" exceeds the ${maxSizeMB} MB limit (${formatBytes(file.size)})`)
          return false
        }
        const mimeOk = acceptMimes.some((m) => {
          if (m.endsWith('/*')) return file.type.startsWith(m.replace('/*', '/'))
          if (m.startsWith('.')) return file.name.toLowerCase().endsWith(m)
          return file.type === m
        })
        if (!mimeOk) {
          setError(`"${file.name}" is not an accepted file type (${accept})`)
          return false
        }
      }
      return true
    },
    [accept, maxSizeMB]
  )

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      const arr = multiple ? Array.from(files) : [files[0]]
      setError(null)
      if (!validate(arr)) return
      setFileCount(arr.length)
      onFiles(arr)
    },
    [multiple, validate, onFiles]
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const onDragLeave = () => setDragging(false)

  const onClick = () => inputRef.current?.click()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`relative flex flex-col items-center justify-center w-full min-h-[240px] border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 select-none group
          ${dragging
            ? 'border-indigo-500 bg-indigo-50/80 scale-[1.01] shadow-2xl shadow-indigo-100/50'
            : 'border-gray-200 bg-gray-50/50 hover:border-indigo-400 hover:bg-white hover:shadow-xl hover:shadow-indigo-50'
          }`}
      >
        {/* Upload icon */}
        <div className={`mb-5 transition-transform duration-500 ${dragging ? 'scale-110' : 'group-hover:scale-110'}`}>
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform">
            <CloudUpload className="w-10 h-10 text-indigo-600" strokeWidth={1.5} />
          </div>
        </div>

        <p className="text-gray-900 font-extrabold text-2xl tracking-tight">
          {dragging ? 'Drop to upload' : label}
        </p>

        {sublabel && (
          <p className="text-gray-500 font-medium text-sm mt-1.5 opacity-80">{sublabel}</p>
        )}

        <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-gray-100/50 rounded-full border border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
           <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            or <span className="text-indigo-600">click to browse</span> &nbsp;·&nbsp; Max {maxSizeMB} MB
          </span>
        </div>

        {/* File count badge */}
        {fileCount > 1 && (
          <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg animate-fade-in shadow-lg shadow-indigo-200">
            {fileCount} files
          </span>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onInputChange}
          className="sr-only"
          aria-label={label}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 flex items-start gap-3 text-sm text-red-700 bg-red-50/50 border border-red-200 backdrop-blur-sm rounded-2xl px-5 py-4 animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <div className="flex-1 font-semibold leading-relaxed">{error}</div>
        </div>
      )}
    </div>
  )
}
