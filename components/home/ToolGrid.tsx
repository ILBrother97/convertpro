'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TOOLS, CATEGORIES, Category, Tool } from '@/lib/tools'
import { ToolIcon } from '@/components/tools/ToolIcon'

export function ToolGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? TOOLS
    : TOOLS.filter((t) => t.category === activeCategory)

  return (
    <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">All Conversion Tools</h2>
        <p className="text-gray-500 text-lg">Choose the right tool for your file type</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`cat-tab-${cat.toLowerCase()}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
      >
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative flex flex-col gap-3 bg-white border border-gray-200 hover:border-indigo-400 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Badges */}
      {(tool.hot || tool.isNew) && (
        <div className="absolute top-3 right-3 flex gap-1">
          {tool.hot && (
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">HOT</span>
          )}
          {tool.isNew && (
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-colors duration-200 text-indigo-600">
        <ToolIcon name={tool.icon} size={24} strokeWidth={2.5} />
      </div>

      {/* Name + description */}
      <div>
        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">
          {tool.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Engine badge */}
      <div className="mt-auto pt-2 text-right">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider ${
          tool.engine === 'client'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            : 'bg-blue-50 text-blue-700 border border-blue-100'
        }`}>
          {tool.engine === 'client' ? '⚡ Local' : '☁️ Cloud'}
        </span>
      </div>
    </Link>
  )
}
