import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import Mp4ToMp3Tool from './_tool'

const tool = getToolBySlug('mp4-to-mp3')!

export const metadata: Metadata = {
  title: tool.title, description: tool.description,
  alternates: { canonical: `https://convertpro.io/${tool.slug}` },
  openGraph: { title: tool.title, description: tool.description, url: `https://convertpro.io/${tool.slug}`, siteName: 'ConvertPro', type: 'website' },
}

export default function Page() {
  return <ToolLayout tool={tool}><Mp4ToMp3Tool /></ToolLayout>
}
