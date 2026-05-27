import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroWithImages from "@/components/about/AboutIntroWithImages";
import TimelineSection from "@/components/about/TimelineSection";
import PeopleSection from "@/components/about/PeopleSection";
import EcosystemSection from "@/components/about/EcosystemSection";
import AboutValues from "@/components/about/AboutValues";
import AboutTabs from "@/components/about/AboutTabs";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "Về chúng tôi – Cafe Capital | Hội Tụ Trí Tuệ, Kết Nối Đầu Tư",
  description:
    "Cafe Capital là nền tảng nội dung, phân tích và cộng đồng đầu tư chuyên nghiệp dành cho nhà đầu tư Việt Nam. Tìm hiểu về hành trình, giá trị và đội ngũ phía sau Cafe Capital.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutIntroWithImages />
        <TimelineSection />
        <PeopleSection />
        <EcosystemSection />
        <AboutValues />
        <AboutTabs />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
