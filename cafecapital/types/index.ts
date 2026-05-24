export type MenuItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

export type MarketIndex = {
  symbol: string;
  name: string;
  value: string;
  changePercent: number;
};

export type NewsArticle = {
  id: string;
  category: "Kinh tế vĩ mô" | "Thị trường" | "Doanh nghiệp";
  title: string;
  summary: string;
  imageUrl?: string;
  publishedAt: string;
  author?: string;
  source?: string;
};

export type QuickNews = {
  id: string;
  content: string;
  publishedAt: string;
};

export type ReportCard = {
  id: string;
  title: string;
  access: "Free" | "Silver+";
  description: string;
  features: string[];
  cta: string;
  locked: boolean;
};

export type StockSignal = {
  ticker: string;
  price: string;
  changePercent: number;
  volume: string;
  signal: "Tích cực" | "Trung lập" | "Theo dõi" | "Rủi ro";
};

export type PricingPlan = {
  id: string;
  name: "Free" | "Hạng Bạc" | "Hạng Vàng" | "Hạng Kim Cương";
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  premium?: boolean;
};

export type MediaItem = {
  id: string;
  type: "Livestream" | "Bản tin định kỳ" | "Cafe chiến lược" | "Bản tin ngày";
  title: string;
  expert: string;
  publishedAt: string;
  duration?: string;
  badge: "Live" | "Replay" | "Bản tin";
  featured?: boolean;
};

export type AboutCard = {
  id: string;
  title: string;
  description: string;
  items: string[];
  href: string;
};
