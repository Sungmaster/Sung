"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Clock, User, Calendar, ArrowRight, Radio } from "lucide-react";
import { mediaItems } from "@/data/mockData";

const badgeConfig = {
  Live: {
    className: "bg-negative text-white",
    dot: true,
  },
  Replay: {
    className: "bg-deep-teal/10 text-deep-teal",
    dot: false,
  },
  "Bản tin": {
    className: "bg-gold/15 text-gold",
    dot: false,
  },
};

const typeIcons: Record<string, string> = {
  Livestream: "📡",
  "Bản tin định kỳ": "📋",
  "Cafe chiến lược": "☕",
  "Bản tin ngày": "📰",
};

export default function MediaSection() {
  const featured = mediaItems.find((m) => m.featured);
  const rest = mediaItems.filter((m) => !m.featured);

  return (
    <section id="media" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-mid-teal uppercase tracking-widest mb-2">
              Media
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-teal">
              Media Cafe Capital – xem nhanh góc nhìn thị trường
            </h2>
          </div>
          <Link
            href="/media/livestream"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors shrink-0"
          >
            Xem lịch livestream <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured video – Large */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer">
                {/* Thumbnail */}
                <div
                  className="relative w-full aspect-video flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #003C3F 0%, #0E5A5F 50%, #062F33 100%)",
                  }}
                >
                  {/* Grain */}
                  <div className="absolute inset-0 opacity-20" aria-hidden="true"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 text-center px-8">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/25 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                    <div className="text-white/60 text-sm mb-2">{typeIcons[featured.type]} {featured.type}</div>
                  </div>

                  {/* Live badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${badgeConfig[featured.badge].className}`}>
                      {badgeConfig[featured.badge].dot && (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                      {featured.badge === "Live" ? "🔴 LIVE" : featured.badge}
                    </span>
                  </div>

                  {/* Duration */}
                  {featured.duration && (
                    <div className="absolute bottom-4 right-4 text-xs font-medium text-white/70 bg-black/40 px-2 py-1 rounded-md">
                      {featured.duration}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-mid-teal bg-mid-teal/10 px-2 py-0.5 rounded-full">
                      {featured.type}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeConfig[featured.badge].className}`}>
                      {featured.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-deep-teal mb-3 group-hover:text-mid-teal transition-colors">
                    {featured.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {featured.expert}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.publishedAt}
                    </span>
                    {featured.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.duration}
                      </span>
                    )}
                  </div>

                  {/* Alert for upcoming live */}
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-negative/5 border border-negative/15">
                    <Radio className="w-4 h-4 text-negative shrink-0" />
                    <span className="text-xs font-medium text-negative">
                      Sắp phát sóng · Thêm vào lịch nhắc nhở
                    </span>
                    <button className="ml-auto text-xs font-bold text-negative underline underline-offset-2 cursor-pointer">
                      Nhắc tôi
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right: List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {["Tất cả", "Livestream", "Bản tin định kỳ", "Cafe chiến lược"].map((cat) => (
                <button
                  key={cat}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-soft-gray text-text-muted hover:bg-deep-teal hover:text-white transition-all duration-200 cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Media list */}
            {rest.map((item, i) => {
              const conf = badgeConfig[item.badge];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-mid-teal/25 hover:shadow-sm bg-white transition-all duration-200 cursor-pointer group"
                >
                  {/* Thumb */}
                  <div
                    className="relative w-20 h-16 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #003C3F, #0E5A5F)",
                    }}
                  >
                    <Play className="w-5 h-5 text-white/80 ml-0.5" fill="rgba(255,255,255,0.8)" />
                    <span className="absolute bottom-1 right-1 text-xs font-bold text-white/70 bg-black/30 px-1 rounded text-[10px]">
                      {item.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs">{typeIcons[item.type]}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${conf.className}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-mid-teal transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                      <span>{item.expert}</span>
                      <span>·</span>
                      <span>{item.publishedAt}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <Link
              href="/media"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-mid-teal border border-mid-teal/20 hover:bg-mid-teal/5 transition-colors"
            >
              Xem thêm nội dung <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
