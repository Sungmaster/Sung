"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden text-center p-10 sm:p-14"
          style={{
            background: "linear-gradient(135deg, #003C3F 0%, #062F33 60%, #0E5A5F 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #DFA15F, transparent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #C8754A, transparent)" }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold/25 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-gold" />
            </div>

            <div className="text-xs font-bold text-gold/70 uppercase tracking-widest mb-3">
              Bản tin
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Nhận bản tin thị trường từ Cafe Capital
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mb-8 leading-relaxed">
              Đăng ký để nhận cập nhật mới, báo cáo nổi bật và chương trình ưu đãi từ Cafe Capital — thẳng vào hộp thư của bạn.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-4 py-3 focus-within:border-gold/40 transition-colors">
                  <Mail className="w-4 h-4 text-white/40 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email của bạn..."
                    required
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-dark-teal transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #DFA15F, #C8754A)" }}
                >
                  Đăng ký nhận tin
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-positive/20 border border-positive/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-positive" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Đăng ký thành công!</p>
                  <p className="text-sm text-white/55 mt-1">
                    Cảm ơn bạn. Bản tin thị trường sẽ được gửi vào hộp thư của bạn sớm nhất.
                  </p>
                </div>
              </motion.div>
            )}

            <p className="text-xs text-white/25 mt-5">
              Không spam. Bạn có thể hủy đăng ký bất kỳ lúc nào.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
