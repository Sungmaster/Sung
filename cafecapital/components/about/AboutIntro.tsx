"use client";

import { motion } from "framer-motion";
import { Newspaper, BookOpen, Users } from "lucide-react";

const stats = [
  {
    icon: Newspaper,
    label: "Daily Market View",
    desc: "Cập nhật thị trường mỗi ngày",
    accent: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: BookOpen,
    label: "Premium Research",
    desc: "Báo cáo chiến lược, vĩ mô, ngành và doanh nghiệp",
    accent: "text-mid-teal",
    bg: "bg-mid-teal/10",
  },
  {
    icon: Users,
    label: "Investor Community",
    desc: "Kết nối nhà đầu tư cùng góc nhìn thực chiến",
    accent: "text-copper",
    bg: "bg-copper/10",
  },
];

export default function AboutIntro() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-medium tracking-wider uppercase">
                Chúng tôi là ai
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal leading-tight mb-6">
              Hơn một trang tin tức tài chính thông thường
            </h2>

            <div className="space-y-4 text-text-muted text-base leading-relaxed">
              <p>
                Cafe Capital là nền tảng nội dung và phân tích đầu tư dành cho
                nhà đầu tư hiện đại – những người cần nhiều hơn một bản tin thị
                trường, nhưng cũng không muốn bị nhấn chìm trong quá nhiều dữ
                liệu rời rạc.
              </p>
              <p>
                Chúng tôi tập trung chắt lọc các chuyển động quan trọng của thị
                trường: từ vĩ mô, dòng tiền, nhóm ngành, doanh nghiệp cho đến
                tín hiệu kỹ thuật. Mỗi nội dung được xây dựng với mục tiêu giúp
                nhà đầu tư có thêm góc nhìn rõ ràng, có cấu trúc và có thể
                chuyển hóa thành hành động.
              </p>
              <p>
                Chúng tôi tin rằng đầu tư hiệu quả không đến từ việc chạy theo
                mọi biến động ngắn hạn, mà đến từ khả năng hiểu bối cảnh, nhận
                diện xu hướng và quản trị rủi ro đúng thời điểm.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-soft-gray flex items-center gap-6">
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-deep-teal">500+</p>
                <p className="text-text-muted text-xs mt-1">Bài phân tích</p>
              </div>
              <div className="w-px h-10 bg-soft-gray" />
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-deep-teal">10K+</p>
                <p className="text-text-muted text-xs mt-1">Nhà đầu tư</p>
              </div>
              <div className="w-px h-10 bg-soft-gray" />
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-deep-teal">5+</p>
                <p className="text-text-muted text-xs mt-1">Năm kinh nghiệm</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Stat cards */}
          <div className="flex flex-col gap-4">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-start gap-4 p-5 rounded-xl border border-soft-gray bg-soft-gray/40 hover:border-gold/30 hover:bg-cream/40 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={18} className={item.accent} />
                </div>
                <div>
                  <p className="font-semibold text-deep-teal text-sm mb-1">
                    {item.label}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-2 p-5 rounded-xl bg-deep-teal text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full" />
              <p className="font-serif text-lg italic leading-relaxed relative z-10">
                &ldquo;Hội Tụ Trí Tuệ – Kết Nối Đầu Tư&rdquo;
              </p>
              <p className="text-white/50 text-xs mt-2">Tagline Cafe Capital</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
