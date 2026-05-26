"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Radio, TrendingUp } from "lucide-react";
import type { VisualCard } from "@/types/about";

const visualCards: VisualCard[] = [
  {
    label: "Daily Market Briefing",
    title: "Phân tích thị trường",
    description: "Đội ngũ cập nhật mỗi sáng",
  },
  {
    label: "Investor Community",
    title: "Cộng đồng nhà đầu tư",
    description: "10,000+ thành viên",
  },
  {
    label: "Cafe Chiến Lược",
    title: "Livestream định kỳ",
    description: "Mỗi tuần một lần",
  },
  {
    label: "Premium Research",
    title: "Báo cáo chuyên sâu",
    description: "Vĩ mô, ngành, doanh nghiệp",
  },
];

const cardGradients = [
  "from-deep-teal to-mid-teal",
  "from-[#1a3a3a] to-deep-teal",
  "from-mid-teal to-[#0a4a4e]",
  "from-deep-teal to-[#1e4a3a]",
];

const cardIcons = [BarChart3, Users, Radio, TrendingUp];

function VisualCardBlock({
  card,
  index,
  imageUrl,
}: {
  card: VisualCard;
  index: number;
  imageUrl?: string;
}) {
  const Icon = cardIcons[index % cardIcons.length];
  const gradient = cardGradients[index % cardGradients.length];

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
      {imageUrl ? (
        <img src={imageUrl} alt={card.title} className="w-full h-full object-cover" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3`}>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon size={20} className="text-gold" />
          </div>
          <p className="text-white/80 text-sm font-medium">{card.title}</p>
          <p className="text-white/40 text-xs">{card.description}</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
        <span className="text-white/90 text-xs font-medium">{card.label}</span>
      </div>
    </div>
  );
}

export default function AboutIntroWithImages() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal leading-tight mb-5">
              Cafe Capital là ai?
            </h2>

            <div className="space-y-4 text-text-muted text-[15px] leading-relaxed">
              <p>
                Cafe Capital là nền tảng nội dung, phân tích và cộng đồng đầu
                tư dành cho nhà đầu tư Việt Nam. Chúng tôi tập trung chắt lọc
                những chuyển động quan trọng của thị trường: từ vĩ mô, dòng
                tiền, nhóm ngành, doanh nghiệp đến tín hiệu kỹ thuật.
              </p>
              <p>
                Thay vì chỉ đưa tin, Cafe Capital hướng tới việc biến thông tin
                thành góc nhìn có cấu trúc: thị trường đang ở đâu, dòng tiền
                đang nghiêng về nhóm nào, rủi ro nào cần kiểm soát và vùng hành
                động nào đáng chú ý.
              </p>
              <p>
                Chúng tôi tin rằng nhà đầu tư không cần nhiều tiếng ồn hơn.
                Điều họ cần là{" "}
                <span className="text-deep-teal font-semibold">
                  một bộ lọc tốt hơn.
                </span>
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-8 flex items-center gap-6 pt-6 border-t border-soft-gray">
              {[
                { value: "500+", label: "Bài phân tích" },
                { value: "10K+", label: "Nhà đầu tư" },
                { value: "Daily", label: "Cập nhật thị trường" },
              ].map((s, i) => (
                <div key={i} className={i > 0 ? "border-l border-soft-gray pl-6" : ""}>
                  <p className="font-serif text-2xl font-bold text-deep-teal">{s.value}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Main large card */}
            <div className="relative rounded-2xl overflow-hidden mb-3 aspect-video group">
              <div className="w-full h-full bg-gradient-to-br from-deep-teal via-mid-teal to-[#0a4545] flex flex-col items-center justify-center gap-4">
                <div className="flex gap-4 items-end">
                  {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                    <div
                      key={i}
                      className="w-5 rounded-t-sm"
                      style={{
                        height: `${h * 0.6}px`,
                        background: i === 7 ? "#DFA15F" : i > 4 ? "rgba(223,161,95,0.5)" : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-white font-semibold text-sm">VN-Index Phân tích ngày</p>
                <p className="text-white/50 text-xs">Cập nhật 15:30 mỗi ngày giao dịch</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white/90 text-xs font-medium">Daily Market Briefing</span>
              </div>
            </div>

            {/* 2x2 small grid */}
            <div className="grid grid-cols-2 gap-3">
              {visualCards.slice(1).map((card, i) => (
                <VisualCardBlock key={i} card={card} index={i + 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
