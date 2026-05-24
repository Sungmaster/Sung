import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import MarketTicker from "@/components/home/MarketTicker";
import NewsSection from "@/components/home/NewsSection";
import ReportsSection from "@/components/home/ReportsSection";
import AnalysisSection from "@/components/home/AnalysisSection";
import MediaSection from "@/components/home/MediaSection";
import PricingSection from "@/components/home/PricingSection";
import AboutSection from "@/components/home/AboutSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarketTicker />
        <NewsSection />
        <ReportsSection />
        <AnalysisSection />
        <MediaSection />
        <PricingSection />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
