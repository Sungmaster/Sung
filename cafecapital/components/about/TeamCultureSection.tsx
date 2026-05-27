"use client";

import { motion } from "framer-motion";
import { Globe, GitBranch, Shield } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Nhìn thị trường theo bối cảnh",
    description:
      "Chúng tôi không tách rời biến động giá khỏi bối cảnh vĩ mô, chính sách, dòng tiền và tâm lý nhà đầu tư. Một tín hiệu chỉ thực sự có ý nghĩa khi được đặt trong đúng môi trường thị trường.",
    accent: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: GitBranch,
    title: "Ra quyết định theo kịch bản",
    description:
      "Cafe Capital ưu tiên tư duy kịch bản thay vì dự báo một chiều. Mỗi nhận định cần có vùng quan sát, điều kiện xác nhận và phương án xử lý nếu thị trường đi ngược kỳ vọng.",
    accent: "text-mid-teal",
    bg: "bg-mid-teal/10",
  },
  {
    icon: Shield,
    title: "Tôn trọng quản trị rủi ro",
    description:
      "Trong đầu tư, sống sót quan trọng không kém kiếm tiền. Chúng tôi đề cao việc bảo vệ tài khoản, kiểm soát tỷ trọng và không để cảm xúc dẫn dắt quyết định.",
    accent: "text-copper",
    bg: "bg-copper/10",
  },
];

export default function TeamCultureSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Triết lý hoạt động
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal max-w-xl leading-tight">
            Cách Cafe Capital nhìn thị trường
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              {/* Number */}
              <div aria-hidden="true" className="absolute -top-3 -left-1 font-serif text-6xl font-bold text-soft-gray select-none pointer-events-none">
                0{i + 1}
              </div>
              <div className="relative pt-6">
                <div
                  className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-5`}
                >
                  <pillar.icon size={22} className={pillar.accent} />
                </div>
                <h3 className="font-semibold text-deep-teal text-lg mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-deep-teal to-mid-teal p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_50%,rgba(223,161,95,0.15),transparent_60%)]" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed">
                &ldquo;Không hô hào đầu cơ. Không cam kết lợi nhuận. Tập trung
                vào dữ liệu, kỷ luật và tư duy đầu tư.&rdquo;
              </p>
              <p className="text-white/50 text-sm mt-2">— Cafe Capital</p>
            </div>
            <div className="flex-shrink-0 flex gap-3">
              <div className="text-center px-5 py-3 rounded-xl bg-white/10">
                <p className="font-serif text-2xl font-bold text-gold">500+</p>
                <p className="text-white/60 text-xs mt-0.5">Báo cáo</p>
              </div>
              <div className="text-center px-5 py-3 rounded-xl bg-white/10">
                <p className="font-serif text-2xl font-bold text-gold">10K+</p>
                <p className="text-white/60 text-xs mt-0.5">Cộng đồng</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
