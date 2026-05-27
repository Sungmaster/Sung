"use client";

import { motion } from "framer-motion";
import { Filter, BarChart3, ShieldCheck, Users } from "lucide-react";

const values = [
  {
    icon: Filter,
    title: "Chọn lọc thay vì nhiễu loạn",
    description:
      "Tập trung vào dữ liệu và sự kiện có khả năng tác động thực sự đến xu hướng, dòng tiền và chiến lược đầu tư.",
    accent: "text-gold",
    bg: "bg-gold/10",
    border: "hover:border-gold/35",
  },
  {
    icon: BarChart3,
    title: "Phân tích có cấu trúc",
    description:
      "Mỗi nhận định cần có logic rõ ràng: bối cảnh, nguyên nhân, tác động và kịch bản hành động cụ thể.",
    accent: "text-mid-teal",
    bg: "bg-mid-teal/10",
    border: "hover:border-mid-teal/35",
  },
  {
    icon: ShieldCheck,
    title: "Thực chiến nhưng kỷ luật",
    description:
      "Đề cao tư duy thực tế, bám sát thị trường, nhưng không cổ vũ hành động cảm tính. Mọi góc nhìn đi kèm quản trị rủi ro.",
    accent: "text-copper",
    bg: "bg-copper/10",
    border: "hover:border-copper/35",
  },
  {
    icon: Users,
    title: "Đồng hành cùng nhà đầu tư",
    description:
      "Xây dựng cộng đồng đầu tư có chiều sâu, nơi nhà đầu tư học hỏi, trao đổi và nâng cấp tư duy thị trường theo thời gian.",
    accent: "text-deep-teal",
    bg: "bg-deep-teal/10",
    border: "hover:border-deep-teal/25",
  },
];

export default function AboutValues() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Giá trị cốt lõi
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal">
            Những nguyên tắc tạo nên Cafe Capital
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`group p-5 rounded-2xl border border-soft-gray ${val.border} bg-soft-gray/30 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default`}
            >
              <div className={`w-11 h-11 rounded-xl ${val.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <val.icon size={20} className={val.accent} />
              </div>
              <h3 className="font-semibold text-deep-teal text-sm mb-2 leading-snug">
                {val.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
