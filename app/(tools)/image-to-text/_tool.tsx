'use client'

import { useState } from 'react'
import { CloudConvertTool } from '@/components/tools/CloudConvertTool'

const LANGUAGES = [
  { value: 'eng', label: 'English' },
  { value: 'ara', label: 'Arabic' },
  { value: 'fra', label: 'French' },
  { value: 'deu', label: 'German' },
  { value: 'spa', label: 'Spanish' },
]

export default function ImageToTextTool() {
  const [language, setLanguage] = useState('eng')

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Recognition Language</label>
        <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </div>
      <CloudConvertTool
        toolSlug="image-to-text"
        accept="image/jpeg,image/png,image/gif,image/webp,.jpg,.jpeg,.png"
        maxSizeMB={20}
        options={{ language }}
        dropLabel="Drop your image here"
        dropSublabel="JPG, PNG, WebP · Text will be extracted using OCR"
      />
    </div>
  )
}
