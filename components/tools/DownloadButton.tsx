'use client'

import { formatBytes } from '@/lib/utils'
import { Download, CheckCircle2, RotateCcw } from 'lucide-react'

type Props = {
  href: string
  filename: string
  fileSize?: number
  label?: string
  onReset?: () => void
}

export function DownloadButton({ href, filename, fileSize, label = 'Download', onReset }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 animate-fade-in">
      {/* Success state icon */}
      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:scale-125 transition-transform" />
        <div className="relative w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-center group">
        <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
          Processing Complete!
        </h3>
        <p className="font-medium text-gray-500 text-sm max-w-[240px] truncate">{filename}</p>
        {fileSize != null && (
          <div className="inline-block mt-2 px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {formatBytes(fileSize)}
          </div>
        )}
      </div>

      <a
        href={href}
        download={filename}
        className="inline-flex items-center gap-3 bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 text-lg w-full sm:w-auto justify-center"
      >
        <Download size={22} strokeWidth={2.5} />
        {label}
      </a>

      {onReset && (
        <button
          onClick={onReset}
          className="group flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-all py-2"
        >
          <RotateCcw size={16} className="group-hover:-rotate-45 transition-transform" />
          Convert another file
        </button>
      )}
    </div>
  )
}
