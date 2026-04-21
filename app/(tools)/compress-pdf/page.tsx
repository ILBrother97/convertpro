import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { CloudConvertTool } from '@/components/tools/CloudConvertTool'

const tool = getToolBySlug('compress-pdf')!

export const metadata: Metadata = {
  title: tool.title, description: tool.description,
  alternates: { canonical: `https://convertpro-online.vercel.app/${tool.slug}` },
  openGraph: { title: tool.title, description: tool.description, url: `https://convertpro-online.vercel.app/${tool.slug}`, siteName: 'ConvertPro', type: 'website' },
}

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CloudConvertTool
        toolSlug="compress-pdf"
        accept="application/pdf,.pdf"
        maxSizeMB={50}
        dropLabel="Drop your PDF here"
        dropSublabel="Up to 50 MB · PDF files only"
      />
    </ToolLayout>
  )
}
