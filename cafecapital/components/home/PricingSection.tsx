"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Star, Diamond, Crown, ArrowRight, MessageCircle } from "lucide-react";
import { pricingPlans } from "@/data/mockData";
import type { PricingPlan } from "@/types";

const planIcons: Record<PricingPlan["name"], React.ReactNode> = {
  Free: <Zap className="w-5 h-5" />,
  "Hạng Bạc": <Star className="w-5 h-5" />,
  "Hạng Vàng": <Crown className="w-5 h-5" />,
  "Hạng Kim Cương": <Diamond className="w-5 h-5" />,
};

const planStyles: Record<
  PricingPlan["name"],
  { card: string; badge: string; icon: string; cta: string }
> = {
  Free: {
    card: "bg-white border-gray-200",
    badge: "bg-soft-gray text-text-muted",
    icon: "bg-soft-gray text-text-muted",
    cta: "bg-soft-gray text-text-dark hover:bg-gray-200",
  },
  "Hạng Bạc": {
    card: "bg-white border-mid-teal/30",
    badge: "bg-mid-teal/10 text-mid-teal",
    icon: "bg-mid-teal/10 text-mid-teal",
    cta: "",
  },
  "Hạng Vàng": {
    card: "bg-white border-gold/30",
    badge: "bg-gold/10 text-gold",
    icon: "bg-gold/10 text-gold",
    cta: "",
  },
  "Hạng Kim Cương": {
    card: "bg-dark-teal border-gold/20",
    badge: "bg-gold/15 text-gold",
    icon: "bg-gold/15 text-gold",
    cta: "",
  },
};

export default function PricingSection() {
  return (
    <section id="goi-dich-vu" className="py-16 sm:py-20 relative overflow-hidden grain-overlay"
      style={{
        background: "linear-gradient(160deg, #062F33 0%, #003C3F 60%, #0E5A5F 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #DFA15F, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-gold/80 uppercase tracking-widest mb-2">
            Gói dịch vụ
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Chọn gói phù hợp với chiến lược của bạn
          </h2>
          <p className="text-white/55 max-w-xl mx-auto text-base leading-relaxed">
            Bắt đầu miễn phí, nâng cấp khi bạn cần nhiều hơn. Mỗi gói đều được thiết kế để hỗ trợ nhà đầu tư ở các cấp độ khác nhau.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {pricingPlans.map((plan, i) => {
            const styles = planStyles[plan.name];
            const isDiamond = plan.name === "Hạng Kim Cương";
            const isSilver = plan.name === "Hạng Bạc";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl border flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl ${styles.card}`}
              >
                {/* Recommended badge */}
                {isSilver && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="text-xs font-bold px-3 py-1 rounded-b-xl text-white"
                      style={{ background: "linear-gradient(to right, #0E5A5F, #003C3F)" }}
                    >
                      Phổ biến nhất
                    </div>
                  </div>
                )}

                {/* Diamond top accent */}
                {isDiamond && (
                  <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #DFA15F, #C8754A, #DFA15F)" }} />
                )}

                <div className={`p-6 flex flex-col flex-1 ${isSilver ? "pt-10" : ""}`}>
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.icon}`}>
                      {planIcons[plan.name]}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles.badge} inline-block mb-0.5`}
                      >
                        {plan.name}
                      </div>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-5 ${isDiamond ? "text-white/60" : "text-text-muted"}`}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isDiamond
                              ? "text-gold"
                              : plan.name === "Free"
                              ? "text-text-muted"
                              : "text-positive"
                          }`}
                        />
                        <span className={isDiamond ? "text-white/75" : "text-text-dark"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {plan.name === "Free" ? (
                    <a
                      href={plan.ctaHref}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${styles.cta}`}
                    >
                      {plan.cta}
                    </a>
                  ) : (
                    <a
                      href={plan.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 ${
                        isDiamond
                          ? "text-dark-teal"
                          : "text-white"
                      }`}
                      style={{
                        background:
                          isDiamond
                            ? "linear-gradient(135deg, #DFA15F, #C8754A)"
                            : plan.name === "Hạng Vàng"
                            ? "linear-gradient(135deg, #C8754A, #DFA15F)"
                            : "linear-gradient(135deg, #0E5A5F, #003C3F)",
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  {/* Zalo note for paid plans */}
                  {plan.name !== "Free" && (
                    <p className={`text-xs mt-2.5 text-center ${isDiamond ? "text-white/35" : "text-text-muted"}`}>
                      Kích hoạt qua Zalo
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-white/35"
        >
          Gói Bạc trở lên được kích hoạt thủ công qua Zalo để đảm bảo xác thực thanh toán và hỗ trợ onboarding cá nhân.
        </motion.p>
      </div>
    </section>
  );
}
