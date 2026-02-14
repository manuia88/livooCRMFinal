import HeroSection from "@/components/home/hero-section";
import ServiceCards from "@/components/home/service-cards";
import FeaturedProperties from "@/components/home/featured-properties";
import LivooHeader from "@/components/layout/livoo-header";
import LivooFooter from "@/components/layout/livoo-footer";

export default function Home() {
  return (
    <>
      <LivooHeader />
      <main className="min-h-screen bg-[#F8F7F4]">
        <HeroSection />
        <ServiceCards />
        <FeaturedProperties />
        {/* More sections will be added here */}
      </main>
      <LivooFooter />
    </>
  );
}
