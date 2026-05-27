"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Newspaper, BookOpen } from "lucide-react";
import { aboutTabs } from "@/data/aboutData";
import type { AboutTabKey } from "@/types/about";

const tabIcons: Record<AboutTabKey, React.ElementType> = {
  "cafe-cap-news": Newspaper,
  "tuyen-dung": Briefcase,
  "chuyen-nghe": BookOpen,
};

export default function AboutTabs() {
  const [active, setActive] = useState<AboutTabKey>("cafe-cap-news");
  const tab = aboutTabs.find((t) => t.key === active)!;

  return (
    <section className="py-20 bg-soft-gray/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Khám phá thêm
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal">
            Khám phá thêm về Cafe Capital
          </h2>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {aboutTabs.map((t) => {
            const Icon = tabIcons[t.key];
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-deep-teal text-white shadow-lg shadow-deep-teal/20"
                    : "bg-white text-text-muted border border-soft-gray hover:border-deep-teal/30 hover:text-deep-teal"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-soft-gray overflow-hidden"
          >
            {/* Two-column layout */}
            <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-soft-gray">
              {/* Left: description */}
              <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-between gap-5">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-deep-teal mb-2">
                    {tab.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {tab.subtitle}
                  </p>
                  <p className="text-text-dark text-sm leading-relaxed">
                    {tab.content}
                  </p>
                </div>
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {tab.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-3 py-1 rounded-full bg-soft-gray text-text-muted border border-soft-gray"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                {tab.key === "tuyen-dung" && (
                  <a
                    href="https://forms.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep-teal text-white text-sm font-semibold hover:bg-mid-teal transition-colors self-start"
                  >
                    Gửi CV qua Google Form
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>

              {/* Right: cards */}
              <div className="lg:col-span-3 p-6 lg:p-8">
                {tab.key === "tuyen-dung" && (
                  <div className="mb-4 p-4 rounded-xl bg-deep-teal/5 border border-deep-teal/10">
                    <p className="text-deep-teal text-xs leading-relaxed italic">
                      &ldquo;Ở Cafe Capital, bạn không chỉ làm trong ngành chứng
                      khoán – bạn tham gia vào quá trình xây dựng một nền tảng
                      giúp nhà đầu tư hiểu thị trường tốt hơn mỗi ngày.&rdquo;
                    </p>
                  </div>
                )}

                {tab.articles && (
                  <div className="space-y-3">
                    {tab.articles.map((article, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="group flex gap-3 p-4 rounded-xl border border-soft-gray bg-soft-gray/30 hover:bg-white hover:border-gold/25 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-deep-teal text-sm leading-snug mb-1 group-hover:text-mid-teal transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-text-muted text-xs leading-relaxed mb-2 line-clamp-2">
                            {article.description}
                          </p>
                          <button type="button" className="flex items-center gap-1 text-gold text-xs font-medium">
                            {article.cta}
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {tab.jobs && (
                  <div className="space-y-3">
                    {tab.jobs.map((job, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="group flex gap-3 p-4 rounded-xl border border-soft-gray bg-soft-gray/30 hover:bg-white hover:border-mid-teal/25 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-1 rounded-full bg-mid-teal/30 group-hover:bg-mid-teal transition-colors" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-deep-teal text-sm leading-snug mb-1">
                            {job.title}
                          </h4>
                          <p className="text-text-muted text-xs leading-relaxed mb-2 line-clamp-2">
                            {job.description}
                          </p>
                          <button type="button" className="flex items-center gap-1 text-mid-teal text-xs font-medium">
                            {job.cta}
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {tab.key === "chuyen-nghe" && (
                  <div className="mt-4 p-4 rounded-xl bg-deep-teal text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(223,161,95,0.15),transparent_60%)]" />
                    <p className="relative z-10 font-serif text-sm font-medium leading-relaxed">
                      &ldquo;Thị trường không chỉ là bảng giá xanh đỏ. Phía sau
                      mỗi nhịp tăng là tâm lý, kỳ vọng, dòng tiền và kỷ luật.&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
