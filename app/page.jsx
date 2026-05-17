import HeroSection from '@/components/Hero/HeroSection';
import StatsBar from '@/components/StatsBar/StatsBar';
import TechMarquee from '@/components/TechMarquee/TechMarquee';
import AboutTeaser from '@/components/HomeSections/AboutTeaser';
import ServiceShowcase from '@/components/HomeSections/ServiceShowcase';
import HowIWork from '@/components/HomeSections/HowIWork';
import ProjectsPreview from '@/components/HomeSections/ProjectsPreview';
import ProofSection from '@/components/HomeSections/ProofSection';
import CtaSection from '@/components/HomeSections/CtaSection';
import { techStack } from '@/data/stack';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutTeaser />
      <ServiceShowcase />
      <HowIWork />
      <ProjectsPreview />
      <section className="section-shell section-shell--dark">
        <div className="section-inner">
          <div className="section-head--center">
            <span className="section-kicker">Tech Stack</span>
            <h2 className="section-title">The tools I reach for.</h2>
          </div>
          <TechMarquee items={techStack} />
        </div>
      </section>
      <ProofSection />
      <CtaSection />
    </>
  );
}
