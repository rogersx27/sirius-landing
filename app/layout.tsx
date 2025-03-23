import './globals.css';
import type { Metadata } from 'next';
import Viewport from "next"
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/Analytics/Analytics';

// Optimiza la carga de fuentes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sirius Farm',
    default: 'Sirius - Farm for Reservations, Courses & Rentals',
  },
  description:
    'Experience the tranquility and beauty of Sirius. Book your stay, join our workshops, or host your event in our stunning venue.',
  keywords: [
    'farm stay',
    'workshops',
    'venue rental',
    'courses',
    'training sessions',
    'retreat',
    'organic farming',
    'sustainable agriculture',
  ],
  authors: [
    {
      name: 'Sirius Farm',
      url: 'https://sirius-farm.com',
    },
  ],
  creator: 'Sirius Farm',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sirius-farm.com',
    title: 'Sirius - Farm for Reservations, Courses & Rentals',
    description: 'Experience the tranquility and beauty of Sirius Farm',
    siteName: 'Sirius Farm',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sirius Farm',
    description: 'Experience the tranquility and beauty of Sirius Farm',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}