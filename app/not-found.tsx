import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 – Page Not Found | ConvertPro',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 text-lg max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary px-8 py-3 text-base">
          ← Back to Home
        </Link>
        <Link href="/#tools" className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl transition-colors text-base">
          Browse All Tools
        </Link>
      </div>
    </div>
  )
}
