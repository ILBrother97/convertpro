import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ConvertPro',
  description: 'Terms of Service for ConvertPro. Free online file conversion tool.',
}

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-10">Last updated: January 2025</p>

      <div className="space-y-8">
        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By using ConvertPro, you agree to these Terms of Service. If you do not agree, please do not use the service.',
          },
          {
            title: '2. Service Description',
            body: 'ConvertPro provides free online file conversion tools. Some tools process files entirely in your browser; others use CloudConvert\'s API for more complex conversions. The service is provided "as is" without warranties of any kind.',
          },
          {
            title: '3. Acceptable Use',
            body: `You agree not to:
• Upload files containing malware, viruses, or malicious code
• Use the service for illegal activities or to violate third-party rights
• Attempt to reverse-engineer, hack, or overload the service
• Upload copyrighted content you do not have rights to convert
• Use automated bots or scripts to abuse the conversion service`,
          },
          {
            title: '4. Intellectual Property',
            body: 'You retain all rights to the files you upload and convert. ConvertPro does not claim any ownership over your converted files.',
          },
          {
            title: '5. Limitations',
            body: 'File size limits apply per tool (images: 20 MB, PDFs: 50 MB, videos: 500 MB). Conversion quality and accuracy cannot be guaranteed for all file types. Cloud conversions are subject to CloudConvert\'s service availability.',
          },
          {
            title: '6. Disclaimer of Warranties',
            body: 'ConvertPro is provided on an "as is" and "as available" basis. We do not guarantee uninterrupted service, error-free operation, or specific conversion results. Use the service at your own risk.',
          },
          {
            title: '7. Limitation of Liability',
            body: 'To the maximum extent permitted by law, ConvertPro shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.',
          },
          {
            title: '8. Changes to Terms',
            body: 'We may update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.',
          },
          {
            title: '9. Contact',
            body: 'For questions about these Terms, contact us at legal@convertpro.io.',
          },
        ].map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
