import { ReactNode } from 'react'
import { Tool } from '@/lib/tools'
import { AdSlot } from '@/components/layout/AdSlot'
import { ToolIcon } from '@/components/tools/ToolIcon'
import { Lock, Shield, Zap, Sparkles } from 'lucide-react'

type Props = {
  tool: Tool
  children: ReactNode
}

export function ToolLayout({ tool, children }: Props) {
  const structuredDataApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `https://convertpro-online.vercel.app/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const structuredDataFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const isClient = tool.engine === 'client'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataFaq) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/10 shadow-xl">
            <ToolIcon name={tool.icon} size={48} strokeWidth={2} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">{tool.name}</h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90">{tool.description}</p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {isClient ? (
              <span className="inline-flex items-center gap-2 bg-emerald-400/20 backdrop-blur-md border border-emerald-400/30 text-emerald-50 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
                <Shield size={14} /> Local Processing
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-blue-400/20 backdrop-blur-md border border-blue-400/30 text-blue-50 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
                <Lock size={14} /> Encrypted Cloud
              </span>
            )}
            <span className="inline-flex items-center gap-2 bg-indigo-400/20 backdrop-blur-md border border-indigo-400/30 text-indigo-50 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
              <Zap size={14} /> Always Free
            </span>
            <span className="inline-flex items-center gap-2 bg-purple-400/20 backdrop-blur-md border border-purple-400/30 text-purple-50 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
              <Sparkles size={14} /> No Signup
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Ad (Desktop only) */}
          <div className="hidden xl:flex flex-col gap-6 w-44 flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot format="sidebar" />
            </div>
          </div>

          {/* Center: Tool + FAQ */}
          <div className="flex-1 min-w-0">
            {/* Tool UI */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              {children}
            </div>

            {/* In-content ad */}
            <div className="mt-8 flex justify-center">
              <AdSlot format="in-content" />
            </div>

            {/* FAQ */}
            {tool.faq.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {tool.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors list-none">
                        {item.q}
                        <svg
                          className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Ad (Desktop only) */}
          <div className="hidden lg:flex flex-col gap-6 w-44 flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot format="sidebar" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
