'use client'

type Props = {
  percent: number
  label?: string
  className?: string
}

export function ProgressBar({ percent, label, className = '' }: Props) {
  const clamped = Math.max(0, Math.min(100, percent))

  return (
    <div className={`w-full ${className} animate-fade-in`}>
      {label && (
        <div className="flex justify-between items-end mb-2.5 px-1">
          <span className="text-sm font-bold text-gray-900 tracking-tight">{label}</span>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md leading-none">
            {clamped}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-4 p-1 shadow-inner overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${clamped}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-pulse" />
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 text-center font-bold uppercase tracking-widest leading-none">
        Please keep this window open
      </p>
    </div>
  )
}
