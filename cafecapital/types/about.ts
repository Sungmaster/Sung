export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tag?: string;
};

export type ValueItem = {
  title: string;
  description: string;
  icon: string;
};

export type AboutArticle = {
  title: string;
  description: string;
  cta: string;
};

export type JobCard = {
  title: string;
  description: string;
  cta: string;
};

export type AboutTabKey = "cafe-cap-news" | "tuyen-dung" | "chuyen-nghe";

export type AboutTab = {
  key: AboutTabKey;
  label: string;
  title: string;
  subtitle: string;
  content: string;
  categories: string[];
  articles?: AboutArticle[];
  jobs?: JobCard[];
};
