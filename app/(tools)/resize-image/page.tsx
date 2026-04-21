import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import ResizeImageTool from './_tool'

const tool = getToolBySlug('resize-image')!

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: `https://convertpro-online.vercel.app/${tool.slug}` },
  openGraph: { title: tool.title, description: tool.description, url: `https://convertpro-online.vercel.app/${tool.slug}`, siteName: 'ConvertPro', type: 'website' },
}

export default function Page() {
  return <ToolLayout tool={tool}><ResizeImageTool /></ToolLayout>
}
