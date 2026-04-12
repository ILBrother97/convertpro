'use client'

import { useState } from 'react'
import { CloudConvertTool } from '@/components/tools/CloudConvertTool'

const BITRATES = [
  { value: '128k', label: '128 kbps — Standard quality' },
  { value: '192k', label: '192 kbps — High quality' },
  { value: '320k', label: '320 kbps — Maximum quality' },
]

export default function Mp4ToMp3Tool() {
  const [bitrate, setBitrate] = useState('192k')

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Audio Bitrate</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BITRATES.map((b) => (
            <button key={b.value} onClick={() => setBitrate(b.value)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${bitrate === b.value ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <CloudConvertTool
        toolSlug="mp4-to-mp3"
        accept="video/mp4,.mp4"
        maxSizeMB={500}
        options={{ audio_bitrate: bitrate }}
        dropLabel="Drop your MP4 video here"
        dropSublabel="Audio will be extracted as MP3 · Up to 500 MB"
      />
    </div>
  )
}
