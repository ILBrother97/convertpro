import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ConvertPro',
  description: 'Learn how ConvertPro handles your files and data. We prioritize your privacy — most tools run entirely in your browser.',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: January 2025</p>

      <div className="prose prose-gray max-w-none space-y-8">
        {[
          {
            title: '1. Data We Collect',
            body: `For client-side tools (image compression, PDF merge/split, resize, word counter, and image format converters), your files are processed entirely in your browser. No data is transmitted to our servers.

For cloud-based tools (PDF to Word, compress PDF, OCR, video conversion, etc.), your files are temporarily uploaded to CloudConvert's secure servers for processing. Files are automatically deleted from CloudConvert's servers within 24 hours.

We collect anonymous usage analytics via Google Analytics 4 to understand which tools are most used and to improve the product.`,
          },
          {
            title: '2. How We Use Your Data',
            body: `Files: Used solely to perform the conversion you requested. Never shared with third parties, sold, or used for any other purpose.

Analytics: Aggregate, anonymous data used to improve the service. No personally identifiable information is collected.`,
          },
          {
            title: '3. Cookies',
            body: `We use cookies for Google Analytics (anonymous, aggregate analytics) and Google AdSense (advertising). You can disable cookies in your browser settings at any time.`,
          },
          {
            title: '4. Third-Party Services',
            body: `CloudConvert: Processes files for cloud-based conversions. See CloudConvert's privacy policy at cloudconvert.com/privacy.

Google Analytics: Anonymous, aggregate usage analytics. See Google's privacy policy at policies.google.com/privacy.

Google AdSense: Advertising service. See Google's advertising privacy policy at policies.google.com/technologies/ads.`,
          },
          {
            title: '5. Data Retention',
            body: `Client-side: Your files never leave your device and are not retained anywhere.

Cloud conversions: Files are deleted from CloudConvert's servers within 24 hours of conversion.

Analytics: Anonymous usage data retained for up to 26 months per Google Analytics defaults.`,
          },
          {
            title: '6. Your Rights',
            body: `You have the right to access, correct, or delete any personal information we hold. Since we collect minimal personal data, this primarily applies to analytics data. Contact us at privacy@convertpro.io to exercise your rights.`,
          },
          {
            title: '7. Contact',
            body: `For privacy-related questions, contact us at privacy@convertpro.io.`,
          },
        ].map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">{section.body}</div>
          </section>
        ))}
      </div>
    </main>
  )
}
