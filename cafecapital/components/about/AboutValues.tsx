"use client";

import { motion } from "framer-motion";
import { Filter, BarChart3, ShieldCheck, Users } from "lucide-react";

const values = [
  {
    icon: Filter,
    title: "Chọn lọc thay vì nhiễu loạn",
    description:
      "Thị trường luôn có rất nhiều thông tin, nhưng không phải thông tin nào cũng quan trọng. Cafe Capital tập trung vào các dữ liệu và sự kiện có khả năng tác động thực sự đến xu hướng, dòng tiền và chiến lược đầu tư.",
    accent: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
    hoverBorder: "hover:border-gold/40",
  },
  {
    icon: BarChart3,
    title: "Phân tích có cấu trúc",
    description:
      "Mỗi nhận định cần có logic rõ ràng: bối cảnh, nguyên nhân, tác động và kịch bản hành động. Chúng tôi ưu tiên cách trình bày giúp nhà đầu tư hiểu nhanh nhưng không hời hợt.",
    accent: "text-mid-teal",
    bg: "bg-mid-teal/10",
    border: "border-mid-teal/20",
    hoverBorder: "hover:border-mid-teal/40",
  },
  {
    icon: ShieldCheck,
    title: "Thực chiến nhưng kỷ luật",
    description:
      "Cafe Capital đề cao tư duy đầu tư thực tế, bám sát diễn biến thị trường, nhưng không cổ vũ hành động cảm tính. Mọi góc nhìn đều cần đi kèm quản trị rủi ro, vùng quan sát và điều kiện xác nhận.",
    accent: "text-copper",
    bg: "bg-copper/10",
    border: "border-copper/20",
    hoverBorder: "hover:border-copper/40",
  },
  {
    icon: Users,
    title: "Đồng hành cùng nhà đầu tư",
    description:
      "Chúng tôi không chỉ cung cấp báo cáo, mà còn hướng tới việc xây dựng một cộng đồng đầu tư có chiều sâu, nơi nhà đầu tư có thể học hỏi, trao đổi và nâng cấp tư duy thị trường theo thời gian.",
    accent: "text-deep-teal",
    bg: "bg-deep-teal/10",
    border: "border-deep-teal/20",
    hoverBorder: "hover:border-deep-teal/30",
  },
];

export default function AboutValues() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group p-6 rounded-2xl border ${val.border} ${val.hoverBorder} bg-soft-gray/30 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-default`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${val.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <val.icon size={22} className={val.accent} />
              </div>
              <h3 className="font-semibold text-deep-teal text-base mb-3 leading-snug">
                {val.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
