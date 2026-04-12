import Link from 'next/link'
import { ShieldCheck, Clock, Heart, ArrowRight } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Trust + AdSense band */}
      <div className="border-t border-gray-800 py-6 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-8">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" /> 
            SSL Secured
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-indigo-400" /> 
            Files deleted after 24h
          </span>
          <span className="flex items-center gap-2">
            <Heart size={16} className="text-pink-500" /> 
            Free forever
          </span>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl mb-4 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl">
                C
              </div>
              <div>
                <span className="text-white">Convert</span>
                <span className="text-indigo-400">Pro</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm opacity-80">
              Professional-grade file conversion tools available for everyone. 
              300+ formats supported. Private by design — local tools never upload your files.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-[0.2em]">Popular Tools</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Compress Image', href: '/compress-image' },
                { label: 'PDF to Word', href: '/pdf-to-word' },
                { label: 'Merge PDF', href: '/merge-pdf' },
                { label: 'Image to PDF', href: '/image-to-pdf' },
                { label: 'MP4 to MP3', href: '/mp4-to-mp3' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white flex items-center group transition-colors">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2 text-indigo-500" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-[0.2em]">Platform</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Sitemap', href: '/sitemap.xml' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium uppercase tracking-wider">
          <p>© {year} ConvertPro Platform. All rights reserved.</p>
          <p className="flex items-center gap-1.5 opacity-60">
            Crafted for speed &amp; privacy
          </p>
        </div>
      </div>
    </footer>
  )
}
