'use client'

import { formatBytes } from '@/lib/utils'
import { FileText, ChevronUp, ChevronDown, X } from 'lucide-react'

type FileItem = {
  id: string
  file: File
}

type Props = {
  files: FileItem[]
  onRemove: (id: string) => void
  onMoveUp?: (id: string) => void
  onMoveDown?: (id: string) => void
}

export function FileList({ files, onRemove, onMoveUp, onMoveDown }: Props) {
  if (files.length === 0) return null

  const totalSize = files.reduce((acc, { file }) => acc + file.size, 0)

  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          {files.length} {files.length > 1 ? 'Files' : 'File'} Queued
        </h3>
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md leading-none">
          {formatBytes(totalSize)}
        </span>
      </div>

      <ul className="space-y-3">
        {files.map(({ id, file }, index) => (
          <li
            key={id}
            className="flex items-center gap-4 bg-white border border-gray-100 shadow-sm hover:border-indigo-100 hover:shadow-md rounded-2xl px-5 py-4 group transition-all"
          >
            {/* File icon */}
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 text-indigo-600">
              <FileText size={20} strokeWidth={2} />
            </div>

            {/* File info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">
                {file.name}
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                {formatBytes(file.size)}
              </p>
            </div>

            {/* Reorder buttons */}
            {(onMoveUp || onMoveDown) && (
              <div className="flex bg-gray-50 p-1 rounded-xl">
                <button
                  onClick={() => onMoveUp?.(id)}
                  disabled={index === 0}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90"
                  aria-label="Move up"
                >
                  <ChevronUp size={16} strokeWidth={3} />
                </button>
                <div className="w-px h-4 bg-gray-200 my-auto" />
                <button
                  onClick={() => onMoveDown?.(id)}
                  disabled={index === files.length - 1}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90"
                  aria-label="Move down"
                >
                  <ChevronDown size={16} strokeWidth={3} />
                </button>
              </div>
            )}

            {/* Remove button */}
            <button
              onClick={() => onRemove(id)}
              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
              aria-label={`Remove ${file.name}`}
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
