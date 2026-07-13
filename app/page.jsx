import HeroSection from '@/components/Hero/HeroSection';
import StatsBar from '@/components/StatsBar/StatsBar';
import TechMarquee from '@/components/TechMarquee/TechMarquee';
import AboutTeaser from '@/components/HomeSections/AboutTeaser';
import ServiceShowcase from '@/components/HomeSections/ServiceShowcase';
import HowIWork from '@/components/HomeSections/HowIWork';
import ProjectsPreview from '@/components/HomeSections/ProjectsPreview';
import CtaSection from '@/components/HomeSections/CtaSection';
import { techStack } from '@/data/stack';
import { createMetadata, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/lib/metadata';

export const metadata = createMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  image: '/images/hero-default.jpg',
  imageAlt: 'Radu-Stefan software developer portfolio',
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceShowcase />
      <div data-story-act="proof">
        <StatsBar />
        <ProjectsPreview />
      </div>
      <HowIWork />
      <div data-story-act="trust">
        <AboutTeaser />
      </div>
      <section className="section-shell section-shell--dark" data-story-act="trust-tools">
        <div className="section-inner">
          <div className="section-head--center">
            <span className="section-kicker">Trust / Working toolkit</span>
            <h2 className="section-title">Tools are selected for the outcome, then kept out of the way.</h2>
          </div>
          <TechMarquee items={techStack} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
