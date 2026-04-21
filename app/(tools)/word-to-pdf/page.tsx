import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { CloudConvertTool } from '@/components/tools/CloudConvertTool'

const tool = getToolBySlug('word-to-pdf')!

export const metadata: Metadata = {
  title: tool.title, description: tool.description,
  alternates: { canonical: `https://convertpro-online.vercel.app/${tool.slug}` },
  openGraph: { title: tool.title, description: tool.description, url: `https://convertpro-online.vercel.app/${tool.slug}`, siteName: 'ConvertPro', type: 'website' },
}

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CloudConvertTool
        toolSlug="word-to-pdf"
        accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx"
        maxSizeMB={50}
        dropLabel="Drop your Word document here"
        dropSublabel="DOCX files only · Up to 50 MB"
      />
    </ToolLayout>
  )
}
