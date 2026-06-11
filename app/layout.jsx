import { Syne, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import PageTransition from '@/components/PageTransition/PageTransition';
import './globals.scss';

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://radu-stefan.dev'),
  title: 'Radu-Stefan - Software Developer',
  description:
    '18-year-old software developer based in Chisinau, Moldova. Building websites, web apps, automation scripts, API integrations, and AI-assisted workflows.',
  keywords: [
    'Radu-Stefan',
    'Radusca',
    'Software Developer',
    'Next.js',
    'React',
    'Automation Scripts',
    'API Integrations',
    'AI-Assisted Coding',
    'Web Developer Moldova',
    'Freelance Developer',
    'Figma to Code',
  ],
  openGraph: {
    title: 'Radu-Stefan - Software Developer',
    description: 'Websites, apps, automations, and AI-assisted software delivery from Chisinau.',
    url: 'https://radu-stefan.dev',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Radu-Stefan' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

const isVercelRuntime = process.env.VERCEL === '1';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <CustomCursor />
        <AnnouncementBar />
        <Navbar />
        <main className="site-main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        {isVercelRuntime ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
