import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'JSON Form Builder - Generate Forms from JSON Schema',
  description: 'A modern tool to generate beautiful, validated forms from JSON schemas with exportable React code.',
  keywords: ['JSON', 'Form Builder', 'React', 'TypeScript', 'Form Generator', 'Validation'],
}

const RootLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
        <ThemeProvider>
          <ErrorBoundary>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
