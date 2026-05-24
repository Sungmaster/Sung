"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, BarChart2, ArrowRight } from "lucide-react";
import { stockSignals } from "@/data/mockData";
import LockedOverlay from "@/components/ui/LockedOverlay";

type FilterChip = "Tất cả" | "Tăng mạnh" | "Giảm mạnh" | "Khối lượng đột biến" | "Theo ngành";

const filters: FilterChip[] = ["Tất cả", "Tăng mạnh", "Giảm mạnh", "Khối lượng đột biến", "Theo ngành"];

const signalConfig = {
  "Tích cực": { color: "text-positive bg-positive/10", dot: "bg-positive" },
  "Theo dõi": { color: "text-gold bg-gold/10", dot: "bg-gold" },
  "Trung lập": { color: "text-text-muted bg-gray-100", dot: "bg-gray-400" },
  "Rủi ro": { color: "text-negative bg-negative/10", dot: "bg-negative" },
};

// Simplified sparkline for table
const miniChartPath = (up: boolean) =>
  up
    ? "M 0 20 C 5 18 10 16 15 12 C 20 8 25 10 30 6"
    : "M 0 6 C 5 8 10 10 15 14 C 20 18 25 16 30 20";

export default function AnalysisSection() {
  const [activeFilter, setActiveFilter] = useState<FilterChip>("Tất cả");
  const [searchValue, setSearchValue] = useState("");

  const filtered = stockSignals.filter((s) => {
    if (searchValue) return s.ticker.toLowerCase().includes(searchValue.toLowerCase());
    if (activeFilter === "Tăng mạnh") return s.changePercent > 1;
    if (activeFilter === "Giảm mạnh") return s.changePercent < -0.5;
    if (activeFilter === "Khối lượng đột biến")
      return parseFloat(s.volume.replace("M", "")) > 8;
    return true;
  });

  return (
    <section id="phan-tich" className="py-16 sm:py-20 bg-soft-gray/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-mid-teal uppercase tracking-widest mb-2">
              Phân tích
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-teal mb-3">
              Phân tích kỹ thuật theo mã cổ phiếu
            </h2>
            <p className="text-text-muted max-w-xl text-base leading-relaxed">
              Tra cứu mã CP, theo dõi biến động giá, khối lượng, ngành và nhận báo cáo kỹ thuật tương ứng.
            </p>
          </div>
          <Link
            href="/phan-tich"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm shrink-0 hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #0E5A5F, #003C3F)" }}
          >
            Dùng thử phân tích <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left: Controls + Table */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search */}
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm focus-within:border-mid-teal/40 transition-colors">
              <Search className="w-4.5 h-4.5 text-text-muted shrink-0" />
              <input
                type="text"
                placeholder="Nhập mã CP: VCB, FPT, HPG..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent text-sm text-text-dark placeholder:text-text-muted outline-none"
              />
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeFilter === f
                      ? "bg-deep-teal text-white"
                      : "bg-white text-text-muted border border-gray-200 hover:border-mid-teal/30 hover:text-mid-teal"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wide">
                        Mã CP
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wide">
                        Giá
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wide">
                        Thay đổi
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wide hidden sm:table-cell">
                        KL giao dịch
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wide">
                        Tín hiệu
                      </th>
                      <th className="px-4 py-3 hidden md:table-cell w-24" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((stock, i) => {
                      const sig = signalConfig[stock.signal];
                      const up = stock.changePercent >= 0;
                      return (
                        <motion.tr
                          key={stock.ticker}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-gray-50 hover:bg-soft-gray/50 transition-colors group cursor-pointer"
                        >
                          <td className="px-4 py-3">
                            <span className="font-bold text-deep-teal text-sm">
                              {stock.ticker}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-text-dark">
                            {stock.price}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`inline-flex items-center gap-0.5 font-bold text-sm ${
                                up ? "text-positive" : "text-negative"
                              }`}
                            >
                              {up ? (
                                <TrendingUp className="w-3.5 h-3.5" />
                              ) : (
                                <TrendingDown className="w-3.5 h-3.5" />
                              )}
                              {up ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-text-muted hidden sm:table-cell">
                            {stock.volume}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sig.color}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${sig.dot}`} />
                              {stock.signal}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <svg viewBox="0 0 30 26" className="w-16 h-6 shrink-0" aria-hidden="true">
                              <path
                                d={miniChartPath(up)}
                                fill="none"
                                stroke={up ? "#12B76A" : "#F04438"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Chart area with locked overlay */}
          <div className="lg:col-span-2 space-y-4">
            {/* Chart placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-mid-teal" />
                  <span className="font-semibold text-text-dark text-sm">Biểu đồ kỹ thuật</span>
                </div>
                <span className="text-xs font-bold text-mid-teal bg-mid-teal/10 px-2 py-0.5 rounded-full">
                  VCB · 1D
                </span>
              </div>
              {/* Chart area */}
              <div className="p-4">
                <svg
                  viewBox="0 0 400 180"
                  className="w-full h-40"
                  aria-label="Biểu đồ kỹ thuật VCB"
                  role="img"
                >
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 40}
                      x2="400"
                      y2={i * 40}
                      stroke="#f0f0f0"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Price area fill */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0E5A5F" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0E5A5F" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 120 C 40 115 80 100 120 90 C 160 80 200 75 240 60 C 280 45 320 50 360 40 L 400 35 L 400 180 L 0 180 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 0 120 C 40 115 80 100 120 90 C 160 80 200 75 240 60 C 280 45 320 50 360 40 L 400 35"
                    fill="none"
                    stroke="#0E5A5F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Volume bars */}
                  {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400].map(
                    (x, i) => (
                      <rect
                        key={x}
                        x={x - 7}
                        y={155 - (i % 3 === 0 ? 25 : i % 2 === 0 ? 15 : 8)}
                        width="14"
                        height={i % 3 === 0 ? 25 : i % 2 === 0 ? 15 : 8}
                        fill={i % 3 === 0 ? "#12B76A" : "#0E5A5F"}
                        opacity="0.3"
                        rx="2"
                      />
                    )
                  )}
                </svg>
              </div>
            </div>

            {/* Locked: Technical report */}
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5">
                <h4 className="font-semibold text-text-dark mb-3 text-sm">
                  Nhận định kỹ thuật đầy đủ
                </h4>
                <div className="space-y-2">
                  {["Xu hướng ngắn hạn", "Vùng hỗ trợ / kháng cự", "Tín hiệu RSI, MACD", "Khuyến nghị hành động"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0"
                      >
                        <div className="w-2 h-2 rounded-full bg-mid-teal/30 shrink-0" />
                        <span className="text-sm text-text-muted">{item}</span>
                        <div className="ml-auto w-20 h-3 bg-gray-100 rounded-full" />
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-9 bg-gray-100 rounded-lg" />
                  <div className="flex-1 h-9 bg-gray-100 rounded-lg" />
                </div>
              </div>
              <LockedOverlay
                title="Nâng cấp để xem nhận định kỹ thuật"
                description="Truy cập phân tích đầy đủ và tải báo cáo PDF/DOCX với gói Hạng Bạc."
                cta="Xem gói dịch vụ"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
