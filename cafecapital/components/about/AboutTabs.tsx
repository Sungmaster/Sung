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
    <section className="py-24 bg-soft-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Khám phá thêm
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal">
            Các mảng nội dung của Cafe Capital
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
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
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {/* Tab header */}
            <div className="bg-white rounded-2xl border border-soft-gray p-8 mb-6">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-teal mb-3">
                    {tab.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {tab.subtitle}
                  </p>
                </div>
                <div>
                  <p className="text-text-dark text-sm leading-relaxed">
                    {tab.content}
                  </p>
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tab.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs px-3 py-1 rounded-full bg-soft-gray text-text-muted border border-soft-gray hover:border-gold/30 hover:text-gold transition-colors cursor-default"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Articles or Jobs */}
            {tab.articles && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tab.articles.map((article, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-white rounded-xl border border-soft-gray p-5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
                  >
                    <h4 className="font-semibold text-deep-teal text-sm leading-snug mb-2 group-hover:text-mid-teal transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed mb-4">
                      {article.description}
                    </p>
                    <button type="button" className="flex items-center gap-1.5 text-gold text-xs font-medium hover:gap-2.5 transition-all duration-200">
                      {article.cta}
                      <ArrowRight size={13} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {tab.jobs && (
              <>
                {/* Culture statement for tuyen-dung */}
                <div className="mb-6 p-5 rounded-xl bg-deep-teal/5 border border-deep-teal/10">
                  <p className="text-deep-teal text-sm leading-relaxed italic">
                    &ldquo;Ở Cafe Capital, bạn không chỉ làm trong ngành chứng
                    khoán – bạn tham gia vào quá trình xây dựng một nền tảng
                    giúp nhà đầu tư hiểu thị trường tốt hơn mỗi ngày.&rdquo;
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                  {tab.jobs.map((job, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="group bg-white rounded-xl border border-soft-gray p-5 hover:border-mid-teal/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-mid-teal/10 flex items-center justify-center mb-3">
                        <Briefcase size={15} className="text-mid-teal" />
                      </div>
                      <h4 className="font-semibold text-deep-teal text-sm leading-snug mb-2">
                        {job.title}
                      </h4>
                      <p className="text-text-muted text-xs leading-relaxed mb-4">
                        {job.description}
                      </p>
                      <button type="button" className="flex items-center gap-1.5 text-mid-teal text-xs font-medium hover:gap-2.5 transition-all duration-200">
                        {job.cta}
                        <ArrowRight size={13} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Recruitment CTA */}
                <div className="rounded-xl border border-gold/20 bg-cream/60 p-6 text-center">
                  <p className="font-semibold text-deep-teal text-base mb-2">
                    Muốn cùng Cafe Capital xây dựng một cộng đồng đầu tư chuyên
                    nghiệp hơn?
                  </p>
                  <p className="text-text-muted text-sm mb-5 max-w-xl mx-auto">
                    Gửi hồ sơ của bạn cho chúng tôi. Dù bạn đang ở điểm xuất
                    phát hay đã có kinh nghiệm thị trường, điều quan trọng nhất
                    là tư duy học hỏi, thái độ nghiêm túc và khả năng đi đường
                    dài.
                  </p>
                  <a
                    href="https://forms.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-deep-teal text-white text-sm font-semibold hover:bg-mid-teal transition-colors"
                  >
                    Gửi CV qua Google Form
                    <ArrowRight size={15} />
                  </a>
                </div>
              </>
            )}

            {/* Chuyen nghe extra content */}
            {tab.key === "chuyen-nghe" && (
              <div className="mt-6 p-6 rounded-xl bg-deep-teal text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(223,161,95,0.15),transparent_60%)]" />
                <div className="relative z-10 max-w-2xl">
                  <p className="font-serif text-lg font-medium mb-3 leading-relaxed">
                    Thị trường chứng khoán không chỉ là bảng giá xanh đỏ.
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Phía sau mỗi nhịp tăng, mỗi cú điều chỉnh, mỗi quyết định
                    mua bán là tâm lý, kỳ vọng, dòng tiền và kỷ luật. Nếu báo
                    cáo giúp nhà đầu tư biết thị trường đang ở đâu, thì Chuyện
                    nghề giúp nhà đầu tư hiểu vì sao mình cần bình tĩnh, cần có
                    phương pháp và cần sống sót đủ lâu để đi cùng những cơ hội
                    lớn.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
