"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, BarChart3, Shield } from "lucide-react";

const heroStats = [
  { label: "VN-Index", value: "1,285.63", change: "+0.82%", up: true },
  { label: "VN30", value: "1,342.20", change: "+0.65%", up: true },
  { label: "HNX", value: "243.18", change: "-0.21%", up: false },
  { label: "Gold", value: "2,365", change: "+0.41%", up: true },
  { label: "DXY", value: "104.50", change: "+0.12%", up: true },
];

const sparklinePoints = [
  "M 0 40 C 20 38 40 42 60 36 C 80 30 100 28 120 22 C 140 16 160 20 180 14 C 200 8 220 12 240 8",
];

function MiniSparkline({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 240 50"
      className="w-full h-8"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${up}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={up ? "#12B76A" : "#F04438"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={up ? "#12B76A" : "#F04438"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={sparklinePoints[0]}
        fill="none"
        stroke={up ? "#12B76A" : "#F04438"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroStats.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden grain-overlay"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 70% 40%, #0E5A5F 0%, #003C3F 40%, #062F33 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #DFA15F 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #12B76A 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-white">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Market Intelligence • Daily Strategy • Premium Research
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.12] mb-6"
            >
              Cafe Capital —{" "}
              <span
                className="block mt-1"
                style={{
                  background: "linear-gradient(135deg, #DFA15F 0%, #F7EFE3 50%, #DFA15F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nền tảng phân tích
              </span>
              <span className="block mt-1 text-white/90">cho nhà đầu tư hiện đại</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.32)}
              className="text-base sm:text-lg text-white/62 leading-relaxed mb-8 max-w-xl"
            >
              Cập nhật tin thị trường, báo cáo chiến lược, phân tích kỹ thuật và góc nhìn vĩ mô
              mỗi ngày — tất cả trong một không gian dữ liệu tinh gọn, sắc bén và dễ hành động.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              {...fadeUp(0.44)}
              className="flex flex-wrap gap-4 mb-8 text-sm text-white/50"
            >
              {[
                { icon: BarChart3, label: "Báo cáo chiến lược" },
                { icon: Shield, label: "Dữ liệu kỹ thuật" },
                { icon: TrendingUp, label: "Góc nhìn vĩ mô" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-gold/70" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.56)} className="flex flex-wrap gap-3">
              <Link
                href="/bao-cao"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-dark-teal text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #DFA15F, #C8754A)" }}
              >
                Khám phá báo cáo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#goi-dich-vu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm border border-white/25 hover:border-white/50 hover:bg-white/8 transition-all duration-200"
              >
                Xem gói dịch vụ
              </Link>
            </motion.div>
          </div>

          {/* Right: Dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Main dashboard glass card */}
            <div
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(223,161,95,0.18)",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs text-white/40 font-medium mb-0.5 uppercase tracking-wide">
                    Portfolio Overview
                  </div>
                  <div className="font-serif text-xl font-semibold text-white">
                    Thị trường hôm nay
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-positive/15 border border-positive/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
                  <span className="text-xs font-semibold text-positive">LIVE</span>
                </div>
              </div>

              {/* Featured stat */}
              <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-white/40 mb-1">
                      {heroStats[activeIndex].label}
                    </div>
                    <div className="font-serif text-3xl font-bold text-white">
                      {heroStats[activeIndex].value}
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 text-sm font-semibold ${
                        heroStats[activeIndex].up ? "text-positive" : "text-negative"
                      }`}
                    >
                      {heroStats[activeIndex].up ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      {heroStats[activeIndex].change}
                    </div>
                  </div>
                  <div className="w-28">
                    <MiniSparkline up={heroStats[activeIndex].up} />
                  </div>
                </div>
              </div>

              {/* Index grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {heroStats.slice(0, 4).map((stat, i) => (
                  <motion.button
                    key={stat.label}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      activeIndex === i
                        ? "bg-gold/15 border border-gold/30"
                        : "bg-white/5 border border-white/8 hover:bg-white/8"
                    }`}
                  >
                    <div className="text-xs text-white/45 mb-0.5">{stat.label}</div>
                    <div className="text-sm font-bold text-white">{stat.value}</div>
                    <div
                      className={`text-xs font-medium ${
                        stat.up ? "text-positive" : "text-negative"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between pt-3 border-t border-white/8">
                <div className="text-xs text-white/35">
                  Cập nhật: {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <Link
                  href="/phan-tich"
                  className="text-xs text-gold hover:text-gold/80 font-medium flex items-center gap-1 transition-colors"
                >
                  Xem chi tiết <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -bottom-5 -left-5 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(14,90,95,0.9)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(223,161,95,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-xs text-white/50">Báo cáo mới nhất</div>
                  <div className="text-sm font-semibold text-white">Chiến lược tuần 22</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
