"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Radio } from "lucide-react";

const people = [
  {
    title: "Đội ngũ phân tích",
    description:
      "Theo dõi vĩ mô, dòng tiền, nhóm ngành, doanh nghiệp và tín hiệu kỹ thuật để xây dựng các báo cáo có cấu trúc, dễ hiểu và có giá trị hành động.",
    icon: BarChart3,
    gradient: "from-deep-teal to-mid-teal",
    accent: "text-gold",
    bg: "bg-gold/10",
    avatarCount: 4,
  },
  {
    title: "Đội ngũ tư vấn",
    description:
      "Đồng hành cùng nhà đầu tư trong quá trình xây dựng danh mục, quản trị rủi ro và lựa chọn chiến lược phù hợp với từng giai đoạn thị trường.",
    icon: Users,
    gradient: "from-mid-teal to-deep-teal",
    accent: "text-mid-teal",
    bg: "bg-mid-teal/10",
    avatarCount: 6,
  },
  {
    title: "Đội ngũ nội dung & cộng đồng",
    description:
      "Biến những phân tích phức tạp thành bản tin, livestream, bài viết và chương trình cộng đồng dễ tiếp cận hơn với nhà đầu tư.",
    icon: Radio,
    gradient: "from-[#1a3a2a] to-deep-teal",
    accent: "text-copper",
    bg: "bg-copper/10",
    avatarCount: 5,
  },
];

function AvatarGroup({ count }: { count: number }) {
  const shades = [
    "from-mid-teal to-deep-teal",
    "from-deep-teal to-[#0a2535]",
    "from-[#2a3a10] to-mid-teal",
    "from-[#3a1a10] to-deep-teal",
    "from-mid-teal to-[#062530]",
    "from-[#1a2a10] to-mid-teal",
  ];
  return (
    <div className="flex -space-x-2">
      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${shades[i % shades.length]} flex items-center justify-center`}
        >
          <span className="text-white/60 text-[10px] font-bold">
            {String.fromCharCode(65 + i)}
          </span>
        </div>
      ))}
      {count > 4 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-soft-gray flex items-center justify-center">
          <span className="text-text-muted text-[10px] font-bold">+{count - 4}</span>
        </div>
      )}
    </div>
  );
}

export default function PeopleSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-medium tracking-wider uppercase">
              Con người
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-teal mb-2">
                Con người phía sau Cafe Capital
              </h2>
              <p className="text-text-muted text-[15px] max-w-xl leading-relaxed">
                Cafe Capital được xây dựng bởi những người làm thị trường, hiểu
                dữ liệu, hiểu khách hàng và tin rằng đầu tư cần cả phương pháp
                lẫn kỷ luật.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {people.map((person, i) => (
            <motion.div
              key={person.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-soft-gray bg-soft-gray/30 hover:bg-white hover:border-gold/25 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image placeholder */}
              <div className={`relative h-36 bg-gradient-to-br ${person.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(223,161,95,0.15),transparent_60%)]" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl ${person.bg} flex items-center justify-center`}>
                    <person.icon size={26} className={person.accent} />
                  </div>
                </div>
                {/* Decorative bars */}
                <div className="absolute bottom-0 left-0 right-0 flex gap-1 px-4 pb-0">
                  {[30, 55, 40, 70, 50, 80, 60].map((h, j) => (
                    <div
                      key={j}
                      className="flex-1 rounded-t-sm bg-white/10"
                      style={{ height: `${h * 0.3}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-deep-teal text-base mb-2">
                  {person.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {person.description}
                </p>
                <div className="flex items-center justify-between">
                  <AvatarGroup count={person.avatarCount} />
                  <span className="text-text-muted text-xs">{person.avatarCount} thành viên</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
