"use client";

import { Lock } from "lucide-react";
import { motion } from "framer-motion";

type LockedOverlayProps = {
  title?: string;
  description?: string;
  cta?: string;
  onCtaClick?: () => void;
};

export default function LockedOverlay({
  title = "Nội dung dành cho thành viên",
  description = "Nâng cấp tài khoản để truy cập toàn bộ báo cáo và phân tích chuyên sâu.",
  cta = "Xem gói dịch vụ",
  onCtaClick,
}: LockedOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(6,47,51,0.0) 0%, rgba(6,47,51,0.92) 35%, rgba(3,60,63,0.98) 100%)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <div className="text-center px-6 py-8">
        <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-5 h-5 text-gold" />
        </div>
        <h4 className="font-semibold text-white text-lg mb-2">{title}</h4>
        <p className="text-sm text-white/60 mb-5 max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-dark-teal cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #DFA15F, #C8754A)" }}
        >
          {cta}
        </button>
      </div>
    </motion.div>
  );
}
