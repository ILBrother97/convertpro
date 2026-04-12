'use client'

import { useState } from 'react'
import { CloudConvertTool } from '@/components/tools/CloudConvertTool'

const QUALITY_PRESETS = [
  { label: 'High Quality', crf: 18, desc: 'Best quality, larger file' },
  { label: 'Medium Quality', crf: 28, desc: 'Balanced size and quality' },
  { label: 'Low Quality', crf: 36, desc: 'Smaller file, reduced quality' },
]

export default function CompressVideoTool() {
  const [selectedIdx, setSelectedIdx] = useState(1)
  const crf = QUALITY_PRESETS[selectedIdx].crf

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Compression Quality</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUALITY_PRESETS.map((q, i) => (
            <button key={q.label} onClick={() => setSelectedIdx(i)}
              className={`px-4 py-3 rounded-xl border text-left transition-all ${selectedIdx === i ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
              <p className={`text-sm font-semibold ${selectedIdx === i ? 'text-indigo-700' : 'text-gray-700'}`}>{q.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{q.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <CloudConvertTool
        toolSlug="compress-video"
        accept="video/mp4,.mp4"
        maxSizeMB={500}
        options={{ crf }}
        dropLabel="Drop your MP4 video here"
        dropSublabel="Reduces file size while preserving quality · Up to 500 MB"
      />
    </div>
  )
}
