import { DM_Sans, JetBrains_Mono, Syne } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import PageTransition from '@/components/PageTransition/PageTransition';
import FirstVisitLoader from '@/components/motion/FirstVisitLoader';
import MotionBoundary from '@/components/motion/MotionBoundary';
import MotionProvider from '@/components/motion/MotionProvider';
import { createMetadata, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import { serializeStructuredData, siteStructuredData } from '@/lib/structuredData';
import { INTRO_SESSION_KEY } from '@/lib/motion/session';
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

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...createMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  }),
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
};

export const viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

const isVercelRuntime = process.env.VERCEL === '1';

export default function RootLayout({ children }) {
  const introScript = `
    try {
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var played = window.sessionStorage.getItem('${INTRO_SESSION_KEY}') === 'true';
      document.documentElement.dataset.intro = reduced || played ? 'skip' : 'pending';
    } catch (error) {
      document.documentElement.dataset.intro = 'pending';
    }
  `;

  return (
    <html
      lang="en"
      data-intro="pending"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(siteStructuredData) }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.first-visit-loader { display: none !important; }`}</style>
        </noscript>
        <MotionProvider>
          <MotionBoundary>
            <FirstVisitLoader />
          </MotionBoundary>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <MotionBoundary>
            <CustomCursor />
          </MotionBoundary>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="site-main" tabIndex={-1}>
            <MotionBoundary>
              <PageTransition />
            </MotionBoundary>
            {children}
          </main>
          <Footer />
          {isVercelRuntime ? (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          ) : null}
        </MotionProvider>
      </body>
    </html>
  );
}
