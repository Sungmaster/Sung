"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Newspaper, BookOpen, Info } from "lucide-react";
import { aboutCards } from "@/data/mockData";

const cardIcons: Record<string, React.ReactNode> = {
  "Giới thiệu về Cap": <Info className="w-5 h-5" />,
  "Tin mới về Cap": <Newspaper className="w-5 h-5" />,
  "Tuyển dụng": <Briefcase className="w-5 h-5" />,
  "Chuyện nghề": <BookOpen className="w-5 h-5" />,
};

const cardAccents: string[] = [
  "from-mid-teal/10 to-transparent",
  "from-gold/8 to-transparent",
  "from-copper/8 to-transparent",
];

export default function AboutSection() {
  return (
    <section id="ve-chung-toi" className="py-16 sm:py-20 bg-soft-gray/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-bold text-mid-teal uppercase tracking-widest mb-2">
              Về chúng tôi
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-teal mb-6 leading-tight">
              Cafe Capital — nơi dữ liệu gặp kinh nghiệm thị trường
            </h2>
            <div className="space-y-4 text-text-muted text-base leading-relaxed">
              <p>
                Chúng tôi xây dựng Cafe Capital như một không gian kết nối giữa tin tức, phân tích,
                báo cáo và kinh nghiệm đầu tư thực chiến.
              </p>
              <p>
                Mục tiêu không chỉ là đưa thông tin, mà là giúp nhà đầu tư <span className="font-semibold text-deep-teal">hiểu điều gì đang dịch chuyển</span>, vì sao nó quan trọng và nên hành động như thế nào.
              </p>
              <p>
                Chúng tôi tin vào sức mạnh của <span className="font-semibold text-deep-teal">dữ liệu + kinh nghiệm + cộng đồng</span> trong hành trình đầu tư lâu dài.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "500+", label: "Báo cáo mỗi năm", sub: "Phân tích chuyên sâu" },
                { value: "10K+", label: "Nhà đầu tư", sub: "Đang theo dõi" },
                { value: "5+", label: "Năm kinh nghiệm", sub: "Trên thị trường" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-soft-gray/60">
                  <div className="font-serif text-2xl font-bold text-deep-teal">{stat.value}</div>
                  <div className="text-xs font-semibold text-text-dark mt-0.5">{stat.label}</div>
                  <div className="text-xs text-text-muted">{stat.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Cards */}
          <div className="space-y-4">
            {aboutCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ x: 6 }}
              >
                <Link
                  href={card.href}
                  className={`flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-mid-teal/25 hover:shadow-md transition-all duration-200 group bg-gradient-to-r ${cardAccents[i]}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-deep-teal/5 group-hover:bg-deep-teal/10 flex items-center justify-center text-mid-teal shrink-0 transition-colors">
                    {cardIcons[card.title]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-deep-teal group-hover:text-mid-teal transition-colors mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-3 leading-relaxed">
                      {card.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-medium text-mid-teal bg-mid-teal/8 px-2.5 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-mid-teal shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
