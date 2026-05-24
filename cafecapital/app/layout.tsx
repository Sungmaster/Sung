import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cafe Capital – Hội Tụ Trí Tuệ, Kết Nối Đầu Tư",
  description:
    "Nền tảng phân tích đầu tư chuyên sâu: tin tức thị trường, báo cáo chiến lược, phân tích kỹ thuật và góc nhìn vĩ mô dành cho nhà đầu tư Việt Nam.",
  keywords: "chứng khoán, đầu tư, phân tích kỹ thuật, VN-Index, báo cáo chứng khoán, cafe capital",
  openGraph: {
    title: "Cafe Capital – Hội Tụ Trí Tuệ, Kết Nối Đầu Tư",
    description: "Nền tảng phân tích đầu tư chuyên sâu cho nhà đầu tư hiện đại.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
