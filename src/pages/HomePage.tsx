import { HeroSlider } from '../components/HeroSlider';
import { ServicesSection } from '../components/ServicesSection';
import { BlogSection } from '../components/BlogSection';
import { FAQSection } from '../components/FAQSection';

export function HomePage() {
  return (
    <>
      <HeroSlider />
      <ServicesSection />
      <BlogSection />
      <FAQSection />
    </>
  );
}
