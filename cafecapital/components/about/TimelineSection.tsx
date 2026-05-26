"use client";

import { motion } from "framer-motion";
import { cafeCapitalTimeline } from "@/data/aboutData";
import { Users, FileText, Radio, Monitor, Crown } from "lucide-react";

const tagConfig: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  Community:       { color: "text-mid-teal",   bg: "bg-mid-teal/10",  border: "border-mid-teal/30",  icon: Users },
  Content:         { color: "text-gold",        bg: "bg-gold/10",      border: "border-gold/30",       icon: FileText },
  Media:           { color: "text-copper",      bg: "bg-copper/10",    border: "border-copper/30",     icon: Radio },
  Platform:        { color: "text-deep-teal",   bg: "bg-deep-teal/10", border: "border-deep-teal/25",  icon: Monitor },
  "Premium Service": { color: "text-gold",      bg: "bg-gold/15",      border: "border-gold/40",       icon: Crown },
};

const thumbGradients: Record<string, string> = {
  Community:       "from-mid-teal to-deep-teal",
  Content:         "from-[#3a2a10] to-deep-teal",
  Media:           "from-[#3a1a0a] to-[#1a2a30]",
  Platform:        "from-deep-teal to-[#062030]",
  "Premium Service": "from-[#2a1a00] to-deep-teal",
};

export default function TimelineSection() {
  return (
    <section className="py-20 bg-soft-gray/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Hành trình
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal mb-3">
            Hành trình phát triển Cafe Capital
          </h2>
          <p className="text-text-muted text-[15px] max-w-xl mx-auto">
            Từ một cộng đồng chia sẻ góc nhìn thị trường, Cafe Capital từng
            bước phát triển thành nền tảng nội dung, báo cáo và dịch vụ đầu tư
            chuyên sâu.
          </p>
        </motion.div>

        {/* Desktop: alternating */}
        <div className="hidden md:block relative">
          {/* Center spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-transparent" />

          <div className="space-y-8">
            {cafeCapitalTimeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const cfg = tagConfig[item.tag] ?? tagConfig["Content"];
              const Icon = cfg.icon;
              const grad = thumbGradients[item.tag] ?? "from-deep-teal to-mid-teal";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className={`flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Card side */}
                  <div className={`w-[46%] ${isLeft ? "pr-10" : "pl-10"}`}>
                    <div className="bg-white rounded-2xl border border-soft-gray hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 p-5 flex gap-4">
                      {/* Thumbnail */}
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${grad} flex flex-col items-center justify-center gap-1`}>
                        <Icon size={18} className="text-gold" />
                        <span className="text-gold/70 text-[9px] font-semibold leading-none">{item.year}</span>
                      </div>
                      {/* Content */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="font-serif text-xl font-bold text-gold leading-none">{item.year}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-semibold text-deep-teal text-sm mb-1.5 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-text-muted text-xs leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="flex-shrink-0 w-[8%] flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-gold border-[3px] border-white shadow-md shadow-gold/30 relative z-10" />
                  </div>

                  {/* Spacer side */}
                  <div className="w-[46%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4 relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-transparent" />
          {cafeCapitalTimeline.map((item, i) => {
            const cfg = tagConfig[item.tag] ?? tagConfig["Content"];
            const Icon = cfg.icon;
            const grad = thumbGradients[item.tag] ?? "from-deep-teal to-mid-teal";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <div className="absolute -left-6 top-5 w-3 h-3 rounded-full bg-gold border-2 border-white shadow-sm" />
                <div className="bg-white rounded-xl border border-soft-gray p-4 flex gap-3">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex flex-col items-center justify-center gap-0.5`}>
                    <Icon size={15} className="text-gold" />
                    <span className="text-gold/70 text-[8px] font-semibold">{item.year}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-serif text-lg font-bold text-gold">{item.year}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-semibold text-deep-teal text-sm mb-1 leading-snug">{item.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
