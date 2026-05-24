"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Download, Lock, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { reportCards } from "@/data/mockData";
import LockedOverlay from "@/components/ui/LockedOverlay";

const accessColors: Record<string, string> = {
  Free: "bg-positive/10 text-positive border-positive/20",
  "Silver+": "bg-gold/10 text-gold border-gold/20",
};

export default function ReportsSection() {
  return (
    <section id="bao-cao" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-mid-teal uppercase tracking-widest mb-2">
            Báo cáo
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-teal mb-4">
            Báo cáo chiến lược – đọc nhanh, hiểu sâu, hành động đúng
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base leading-relaxed">
            Từ bản tin ngày đến báo cáo tuần, Cafe Capital giúp nhà đầu tư nắm được bối cảnh,
            dòng tiền và vùng hành động quan trọng.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reportCards.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div
                className={`relative rounded-2xl overflow-hidden border h-full flex flex-col transition-all duration-300 ${
                  report.locked
                    ? "border-gray-100 bg-white"
                    : "border-mid-teal/20 bg-white"
                } group-hover:shadow-lg group-hover:border-mid-teal/30`}
              >
                {/* Card top accent */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: report.locked
                      ? "linear-gradient(to right, #DFA15F, #C8754A)"
                      : "linear-gradient(to right, #0E5A5F, #003C3F)",
                  }}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-soft-gray group-hover:bg-deep-teal/5 transition-colors">
                      <FileText className="w-5.5 h-5.5 text-mid-teal" />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                          accessColors[report.access]
                        }`}
                      >
                        {report.access}
                      </span>
                      {report.locked && (
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Lock className="w-3 h-3" />
                          <span>Cần nâng cấp</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-deep-teal mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-5 leading-relaxed">
                    {report.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {report.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            report.locked ? "text-gold/70" : "text-positive"
                          }`}
                        />
                        <span className="text-text-dark">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* PDF download preview (locked) */}
                  {report.locked && (
                    <div className="mb-4 p-3 rounded-xl border border-dashed border-gray-200 flex items-center gap-3 bg-soft-gray/50">
                      <div className="w-10 h-12 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-text-dark truncate">
                          BaoCao_Tuan_W22_2026.pdf
                        </div>
                        <div className="text-xs text-text-muted">2.4 MB · PDF</div>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Download className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {report.locked ? (
                    <button
                      className="w-full py-3 rounded-xl text-sm font-semibold text-dark-teal transition-all duration-200 hover:opacity-90 cursor-pointer"
                      style={{ background: "linear-gradient(135deg, #DFA15F, #C8754A)" }}
                    >
                      {report.cta}
                    </button>
                  ) : (
                    <Link
                      href="/bao-cao/ngay"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-deep-teal hover:bg-mid-teal transition-colors duration-200"
                    >
                      {report.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-soft-gray border border-gray-200 text-sm text-text-muted">
            <Star className="w-4 h-4 text-gold" />
            <span>
              Gói Bạc trở lên được kích hoạt thủ công qua Zalo để đảm bảo xác thực thanh toán và hỗ trợ onboarding cá nhân.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
