import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { ToolGrid } from '@/components/home/ToolGrid'
import { AdSlot } from '@/components/layout/AdSlot'
import { 
  Lock, 
  Zap, 
  MousePointer2, 
  Globe, 
  Search, 
  Settings, 
  Package, 
  Heart,
  Monitor,
  Laptop,
  Terminal,
  Smartphone,
  Tablet
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'ConvertPro – Free Online File Converter | 300+ Formats',
  description:
    'Convert PDF, images, video, and audio files online for free. No signup. 300+ formats. Works in your browser.',
  alternates: { canonical: 'https://convertpro-online.vercel.app' },
}

const STATS = [
  { value: '50M+', label: 'Files Converted' },
  { value: '300+', label: 'Formats Supported' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9★', label: 'User Rating' },
]

const FEATURES = [
  { icon: Lock, title: 'Privacy First', desc: 'Client-side tools never upload your files. Your data stays on your device.', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Browser-based conversions happen instantly. No waiting for uploads.', color: 'text-amber-600', bg: 'bg-amber-100' },
  { icon: MousePointer2, title: 'Drag & Drop', desc: 'Simply drag your files in. Or click to browse — it\'s that easy.', color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { icon: Globe, title: 'All Platforms', desc: 'Works on Windows, macOS, Linux, Android, iOS — any browser.', color: 'text-blue-600', bg: 'bg-blue-100' },
  { icon: Search, title: 'OCR Support', desc: 'Extract text from scanned PDFs and images with our AI-powered OCR.', color: 'text-purple-600', bg: 'bg-purple-100' },
  { icon: Settings, title: 'Advanced Options', desc: 'Control quality, dimensions, bitrate, and more for every conversion.', color: 'text-gray-700', bg: 'bg-gray-200' },
  { icon: Package, title: 'Batch Processing', desc: 'Merge and process multiple files in a single operation.', color: 'text-orange-600', bg: 'bg-orange-100' },
  { icon: Heart, title: 'Always Free', desc: 'No hidden fees, no subscriptions. ConvertPro is free forever.', color: 'text-pink-600', bg: 'bg-pink-100' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Upload', desc: 'Drag & drop your file or click to browse' },
  { step: '02', title: 'Choose Format', desc: 'Pick the output format and quality settings' },
  { step: '03', title: 'Convert', desc: 'Hit convert — it runs instantly' },
  { step: '04', title: 'Download', desc: 'Save your converted file — done!' },
]

const PLATFORMS = [
  { icon: Monitor, label: 'Windows' },
  { icon: Laptop, label: 'macOS' },
  { icon: Terminal, label: 'Linux' },
  { icon: Smartphone, label: 'Android' },
  { icon: Tablet, label: 'iOS' },
  { icon: Globe, label: 'Any Browser' },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-indigo-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-page ad */}
      <div className="flex justify-center py-6 bg-gray-50">
        <AdSlot slot="2222222222" format="in-content" />
      </div>

      {/* Tool grid */}
      <ToolGrid />

      {/* Features */}
      <section className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why ConvertPro?</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Everything you need, nothing you don&apos;t. Professional tools for everyone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${f.bg} ${f.color}`}>
                  <f.icon strokeWidth={2.5} size={28} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">How It Works</h2>
            <p className="text-indigo-200 text-xl font-medium">Convert any file in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} className="relative text-center group">
                <div className="w-20 h-20 bg-white/10 border-2 border-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-3xl font-black text-indigo-200 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                <h3 className="font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-indigo-200 text-sm leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-4 w-12 items-center justify-center text-indigo-400 text-2xl font-light">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-bold mb-8 text-sm uppercase tracking-[0.2em]">Works flawlessly on every platform</p>
          <div className="flex flex-wrap justify-center gap-4">
            {PLATFORMS.map((p) => (
              <span key={p.label} className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3 rounded-2xl text-sm shadow-sm border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                <p.icon size={18} strokeWidth={2.5} className="text-gray-400" />
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
