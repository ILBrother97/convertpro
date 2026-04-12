'use client'

import { useState, useCallback } from 'react'
import { estimateReadingTime } from '@/lib/utils'

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}
function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
}
function countParagraphs(text: string): number {
  return text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
}
function getKeywords(text: string): { word: string; count: number }[] {
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) ?? []
  const freq: Record<string, number> = {}
  words.forEach((w) => { freq[w] = (freq[w] ?? 0) + 1 })
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }))
}

export default function WordCounterTool() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const words = countWords(text)
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const lines = text === '' ? 0 : text.split('\n').length
  const sentences = countSentences(text)
  const paragraphs = countParagraphs(text)
  const readingTime = estimateReadingTime(words)
  const keywords = getKeywords(text)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  const STATS = [
    { label: 'Words', value: words.toLocaleString(), color: 'text-indigo-600' },
    { label: 'Characters', value: chars.toLocaleString(), color: 'text-purple-600' },
    { label: 'No Spaces', value: charsNoSpaces.toLocaleString(), color: 'text-blue-600' },
    { label: 'Lines', value: lines.toLocaleString(), color: 'text-teal-600' },
    { label: 'Sentences', value: sentences.toLocaleString(), color: 'text-orange-600' },
    { label: 'Paragraphs', value: paragraphs.toLocaleString(), color: 'text-pink-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div className="relative">
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
          className="w-full min-h-[240px] border border-gray-300 rounded-2xl px-4 py-4 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y leading-relaxed"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-0.5 rounded-md border border-gray-200">
          {words} words
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button id="clear-btn" onClick={() => setText('')}
          className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl text-sm transition-colors">
          🗑️ Clear
        </button>
        <button id="copy-btn" onClick={handleCopy}
          className={`flex-1 font-medium py-2.5 rounded-xl text-sm transition-all ${copied ? 'bg-green-100 text-green-700 border border-green-300' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
          {copied ? '✅ Copied!' : '📋 Copy Text'}
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
            <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Reading time */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <span className="text-2xl">⏱️</span>
        <div>
          <span className="font-semibold text-indigo-900">Estimated reading time: </span>
          <span className="text-indigo-700">{readingTime}</span>
          <span className="text-indigo-400 text-sm ml-2">(at 200 WPM)</span>
        </div>
      </div>

      {/* Top keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map(({ word, count }) => (
              <span key={word} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                {word}
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
