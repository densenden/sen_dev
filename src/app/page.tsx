import HeroDynamic from "@/components/hero-dynamic"
import PhilosophySection from "@/components/philosophy-section"
import ProductBundles from "@/components/product-bundles"
import ProjectShowcaseDynamic from "@/components/project-showcase-dynamic"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroDynamic />
      <div id="philosophy">
        <PhilosophySection />
      </div>
      <div id="packages">
        <ProductBundles />
      </div>
      <div id="showcase">
        <ProjectShowcaseDynamic />
      </div>
    </div>
  );
}
