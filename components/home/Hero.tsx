

import Link from 'next/link'
import { Lock, Zap, Globe, Sparkles, Heart, Upload } from 'lucide-react'

export function Hero() {
  const BADGES = [
    { icon: Lock, label: 'Secure' },
    { icon: Zap, label: 'Instant' },
    { icon: Globe, label: 'No Install' },
    { icon: Sparkles, label: 'OCR Ready' },
    { icon: Heart, label: 'Free' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          300+ formats • No limits
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Convert Any File,{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Free &amp; Instant
          </span>
        </h1>

        <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-10 opacity-90">
          Professional PDF, Word, images, audio, and video tools. No signup required. Works in your browser.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm uppercase tracking-wider"
            >
              <badge.icon size={14} className="text-indigo-300" />
              {badge.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#tools"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 text-lg"
          >
            <Upload size={20} />
            Choose File to Convert
          </Link>
          <span className="text-indigo-300 font-medium">or scroll to pick a tool ↓</span>
        </div>

        {/* Format pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['PDF', 'DOCX', 'JPG', 'PNG', 'MP4', 'MP3', 'WebP', 'GIF', '+290 more'].map((fmt) => (
            <span
              key={fmt}
              className="bg-white/5 border border-white/10 text-xs px-2.5 py-1 rounded-md text-indigo-200"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
