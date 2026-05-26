"use client";

import { motion } from "framer-motion";
import { cafeCapitalTimeline } from "@/data/aboutData";

const tagColors: Record<string, string> = {
  Community: "bg-mid-teal/15 text-mid-teal border-mid-teal/30",
  Content: "bg-gold/15 text-gold border-gold/30",
  Media: "bg-copper/15 text-copper border-copper/30",
  Platform: "bg-deep-teal/10 text-deep-teal border-deep-teal/20",
  "Premium Service": "bg-gold/20 text-gold border-gold/40",
};

export default function TimelineSection() {
  return (
    <section className="py-24 bg-soft-gray/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Hành trình
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal mb-4">
            Hành trình phát triển Cafe Capital
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto leading-relaxed">
            Từ một cộng đồng chia sẻ góc nhìn thị trường, Cafe Capital từng
            bước phát triển thành nền tảng nội dung, báo cáo và dịch vụ đầu tư
            chuyên sâu dành cho nhà đầu tư Việt Nam.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-mid-teal/40 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {cafeCapitalTimeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className="w-5/12">
                    <div className="group p-5 rounded-xl bg-white border border-soft-gray hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <span className="font-serif text-2xl font-bold text-gold">
                          {item.year}
                        </span>
                        {item.tag && (
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full border font-medium flex-shrink-0 ${
                              tagColors[item.tag] ||
                              "bg-mid-teal/10 text-mid-teal border-mid-teal/20"
                            }`}
                          >
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-deep-teal text-sm mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-gold border-4 border-white shadow-md shadow-gold/30" />
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-4 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-mid-teal/40 to-transparent" />
          {cafeCapitalTimeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 pl-12 relative"
            >
              <div className="absolute left-2.5 top-5 w-3 h-3 rounded-full bg-gold border-2 border-white shadow-sm" />
              <div className="flex-1 p-4 rounded-xl bg-white border border-soft-gray">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <span className="font-serif text-xl font-bold text-gold">
                    {item.year}
                  </span>
                  {item.tag && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        tagColors[item.tag] ||
                        "bg-mid-teal/10 text-mid-teal border-mid-teal/20"
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-deep-teal text-sm mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
