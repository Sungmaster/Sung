"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="py-24 bg-soft-gray/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-deep-teal px-8 py-16 sm:px-16"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-teal via-deep-teal to-mid-teal/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(223,161,95,0.2),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(14,90,95,0.4),transparent_50%)]" />

          {/* Decorative dots */}
          <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-gold/40" />
          <div className="absolute top-12 right-16 w-1 h-1 rounded-full bg-gold/20" />
          <div className="absolute bottom-8 left-10 w-1.5 h-1.5 rounded-full bg-white/20" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-medium tracking-widest uppercase">
                Bắt đầu ngay hôm nay
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-5">
              Bắt đầu hành trình đầu tư{" "}
              <span className="text-gold italic">có hệ thống hơn</span>
              <br />
              cùng Cafe Capital
            </h2>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Theo dõi tin tức, đọc báo cáo, cập nhật phân tích kỹ thuật và kết
              nối với cộng đồng nhà đầu tư đang cùng nhau nâng cấp tư duy thị
              trường mỗi ngày.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-deep-teal font-semibold text-sm hover:bg-gold/90 transition-all duration-200 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30"
              >
                Xem gói dịch vụ
                <ArrowRight size={16} />
              </a>
              <a
                href="https://zalo.me/cafecapital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200"
              >
                <MessageCircle size={16} />
                Tham gia Zalo cộng đồng
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/40 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-positive" />
                Không cam kết lợi nhuận
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold" />
                Dữ liệu có kiểm chứng
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-mid-teal" />
                Cộng đồng thực chiến
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
