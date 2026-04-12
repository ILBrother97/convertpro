import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { CloudConvertTool } from '@/components/tools/CloudConvertTool'

const tool = getToolBySlug('pdf-to-word')!

export const metadata: Metadata = {
  title: tool.title, description: tool.description,
  alternates: { canonical: `https://convertpro.io/${tool.slug}` },
  openGraph: { title: tool.title, description: tool.description, url: `https://convertpro.io/${tool.slug}`, siteName: 'ConvertPro', type: 'website' },
}

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CloudConvertTool
        toolSlug="pdf-to-word"
        accept="application/pdf,.pdf"
        maxSizeMB={50}
        dropLabel="Drop your PDF here"
        dropSublabel="Converts to editable Word DOCX · Up to 50 MB"
      />
    </ToolLayout>
  )
}
