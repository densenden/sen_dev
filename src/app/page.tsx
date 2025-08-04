import HeroSection from "@/components/hero-section"
import ServicesOverview from "@/components/services-overview"
import ClientProjects from "@/components/client-projects"
import WhyVibeCoding from "@/components/why-vibe-coding"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesOverview />
      <ClientProjects />
      <WhyVibeCoding />
    </div>
  );
}
