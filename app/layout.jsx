import { Syne, DM_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import PageTransition from '@/components/PageTransition/PageTransition';
import './globals.scss';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://radu-stefan.vercel.app'),
  title: {
    default: 'Radu-Stefan — Full-Stack Developer',
    template: '%s — Radu-Stefan',
  },
  description:
    '18-year-old full-stack developer based in Chisinau, Moldova. Building fast, modern web experiences — landing pages, full websites, web apps, and UI/UX.',
  keywords: [
    'Radu-Stefan',
    'Radusca',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'Web Developer Moldova',
    'Freelance Developer',
    'Figma to Code',
  ],
  authors: [{ name: 'Radu-Stefan' }],
  creator: 'Radu-Stefan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Radu-Stefan',
    title: 'Radu-Stefan — Full-Stack Developer',
    description:
      'Fast, modern web experiences from Chisinau, Moldova. Landing pages, full websites, web apps, UI/UX.',
    images: [{ url: '/images/profile.jpg', width: 1200, height: 630, alt: 'Radu-Stefan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radu-Stefan — Full-Stack Developer',
    description: 'Fast, modern web experiences from Chisinau, Moldova.',
    images: ['/images/profile.jpg'],
  },
  icons: {
    icon: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
