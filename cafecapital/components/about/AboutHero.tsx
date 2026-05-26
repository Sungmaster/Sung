"use client";

import { motion } from "framer-motion";
import { Coffee, TrendingUp, BarChart2, FileText, Zap } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-dark-teal grain-overlay">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-teal via-deep-teal to-[#041E21]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(14,90,95,0.4),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(223,161,95,0.08),transparent_50%)]" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-6">
              <Coffee size={13} className="text-gold" />
              <span className="text-gold text-xs font-medium tracking-widest uppercase">
                Về Cafe Capital
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.12] mb-6">
              Nơi dữ liệu{" "}
              <span className="text-gold italic">gặp kinh nghiệm</span>
              <br />
              thị trường
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              Cafe Capital được xây dựng như một không gian kết nối giữa tin
              tức, phân tích, báo cáo và kinh nghiệm đầu tư thực chiến. Chúng
              tôi giúp nhà đầu tư hiểu điều gì đang dịch chuyển, vì sao nó quan
              trọng và nên hành động như thế nào.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#reports"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-deep-teal font-semibold text-sm hover:bg-gold/90 transition-all duration-200 shadow-lg shadow-gold/20"
              >
                <FileText size={16} />
                Khám phá báo cáo
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200"
              >
                Xem gói dịch vụ
              </a>
            </div>
          </motion.div>

          {/* Right: Dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main glassmorphism card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                      <Coffee size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Market Intelligence</p>
                      <p className="text-white/40 text-xs">Daily Analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-positive/15 border border-positive/20">
                    <TrendingUp size={11} className="text-positive" />
                    <span className="text-positive text-xs font-semibold">+1.47%</span>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="mb-5">
                  <div className="flex items-end gap-1 h-14">
                    {[35, 55, 40, 65, 50, 75, 60, 85, 70, 90, 78, 95].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm transition-all duration-300"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 11
                                ? "#DFA15F"
                                : i > 7
                                ? "rgba(223,161,95,0.5)"
                                : "rgba(14,90,95,0.6)",
                          }}
                        />
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-white/30 text-xs">9:00</span>
                    <span className="text-white text-sm font-bold">VN-Index 1,284.65</span>
                    <span className="text-white/30 text-xs">15:00</span>
                  </div>
                </div>

                {/* Signal badges */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: "VN30", val: "+1.82%", color: "text-positive" },
                    { label: "HNX", val: "+0.63%", color: "text-positive" },
                    { label: "UPCOM", val: "-0.14%", color: "text-negative" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg bg-white/5 px-3 py-2 text-center"
                    >
                      <p className="text-white/50 text-xs mb-0.5">{item.label}</p>
                      <p className={`text-xs font-bold ${item.color}`}>{item.val}</p>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {["Market Intelligence", "Daily Strategy", "Premium Research"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-mid-teal/30 text-white/70 border border-mid-teal/30"
                      >
                        {badge}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Floating accent cards */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-gold/20 bg-dark-teal/90 backdrop-blur-md px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-gold" />
                  <span className="text-white/80 text-xs font-medium">Cafe Chiến Lược</span>
                </div>
                <p className="text-gold text-xs mt-1">Hôm nay 08:30</p>
              </div>

              <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-dark-teal/90 backdrop-blur-md px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <BarChart2 size={14} className="text-mid-teal" />
                  <span className="text-white/80 text-xs font-medium">Dòng tiền khối ngoại</span>
                </div>
                <p className="text-positive text-xs font-semibold mt-1">+342 tỷ mua ròng</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
