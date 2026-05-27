export type AboutTabKey = "cafe-cap-news" | "tuyen-dung" | "chuyen-nghe";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tag: string;
  imageLabel?: string;
};

export type VisualCard = {
  title: string;
  description?: string;
  label?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type ValueCard = {
  icon: string; // Lucide icon name
  title: string;
  description: string;
};

export type TabArticle = {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
};

export type TabJob = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
};
