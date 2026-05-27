"use client";

import { motion } from "framer-motion";
import { Filter, FileBarChart, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: Filter,
    title: "Tin tức được chắt lọc",
    description:
      "Cập nhật các sự kiện có ảnh hưởng đến thị trường, nhóm ngành và doanh nghiệp, thay vì chạy theo mọi tiếng ồn ngắn hạn.",
    accent: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: FileBarChart,
    title: "Báo cáo có cấu trúc",
    description:
      "Từ báo cáo ngày, báo cáo nhanh đến báo cáo tuần, nội dung được trình bày theo bối cảnh, tác động và kịch bản hành động.",
    accent: "text-mid-teal",
    bg: "bg-mid-teal/10",
  },
  {
    icon: TrendingUp,
    title: "Phân tích kỹ thuật theo mã",
    description:
      "Theo dõi cổ phiếu qua dữ liệu giá, khối lượng, xu hướng và tín hiệu kỹ thuật nhằm hỗ trợ quá trình ra quyết định.",
    accent: "text-copper",
    bg: "bg-copper/10",
  },
  {
    icon: Users,
    title: "Cộng đồng đầu tư thực chiến",
    description:
      "Kết nối nhà đầu tư qua livestream, bản tin, chương trình định kỳ và các góc nhìn thực tế từ người làm thị trường.",
    accent: "text-deep-teal",
    bg: "bg-deep-teal/10",
  },
];

export default function EcosystemSection() {
  return (
    <section className="py-20 bg-soft-gray/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Hệ sinh thái
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal mb-3">
            Không chỉ là website tin tức
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto leading-relaxed">
            Cafe Capital được thiết kế như một hệ sinh thái đầu tư, nơi thông
            tin, dữ liệu, báo cáo và cộng đồng cùng phục vụ một mục tiêu: giúp
            nhà đầu tư ra quyết định tốt hơn.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-white rounded-xl border border-soft-gray p-5 hover:border-gold/25 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon size={19} className={f.accent} />
              </div>
              <h3 className="font-semibold text-deep-teal text-sm mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl bg-deep-teal px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(223,161,95,0.12),transparent_60%)]" />
          <div className="relative z-10">
            <p className="font-semibold text-white text-base">
              Nhà đầu tư cần nhiều hơn một bản tin thị trường
            </p>
            <p className="text-white/55 text-sm mt-0.5">
              Khám phá toàn bộ hệ sinh thái nội dung của Cafe Capital
            </p>
          </div>
          <a
            href="/bao-cao"
            className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-deep-teal text-sm font-semibold hover:bg-gold/90 transition-colors"
          >
            Xem báo cáo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
