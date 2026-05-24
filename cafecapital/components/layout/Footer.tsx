import Link from "next/link";
import { Coffee, TrendingUp, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Tin mới", href: "/tin-moi" },
  { label: "Báo cáo", href: "/bao-cao" },
  { label: "Phân tích", href: "/phan-tich" },
  { label: "Media", href: "/media" },
  { label: "Gói dịch vụ", href: "#goi-dich-vu" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
];

const contactInfo = [
  { icon: Phone, label: "Hotline", value: "0909 xxx xxx" },
  { icon: Mail, label: "Email", value: "contact@cafecapital.vn" },
  { icon: MapPin, label: "Địa chỉ", value: "TP. Hồ Chí Minh, Việt Nam" },
  { icon: MessageCircle, label: "Zalo OA", value: "Cafe Capital" },
];

const socialLinks = [
  {
    name: "Zalo",
    href: "https://zalo.me/cafecapital",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/cafecapital",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@cafecapital",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@cafecapital",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark-teal text-white">
      {/* Gold separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-deep-teal border border-gold/20 group-hover:border-gold/40 transition-colors">
                <Coffee className="w-5 h-5 text-gold" />
                <TrendingUp className="absolute w-3.5 h-3.5 text-gold/70 translate-x-3 -translate-y-3" />
              </div>
              <div>
                <span className="font-serif text-xl font-semibold text-white">Cafe </span>
                <span className="font-serif text-xl font-semibold text-gold">Capital</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 font-medium mb-5 italic font-serif">
              Hội Tụ Trí Tuệ – Kết Nối Đầu Tư
            </p>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              Nền tảng phân tích đầu tư chuyên sâu, cung cấp góc nhìn thị trường, báo cáo chiến lược và dữ liệu kỹ thuật cho nhà đầu tư Việt Nam.
            </p>
            {/* Social links */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 text-white/60 hover:bg-gold/20 hover:text-gold transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white/90 uppercase tracking-wider mb-4">
              Khám phá
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white/90 uppercase tracking-wider mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <item.icon className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-white/35 block">{item.label}</span>
                    <span className="text-sm text-white/65">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Zalo Community */}
          <div>
            <h4 className="text-sm font-bold text-white/90 uppercase tracking-wider mb-4">
              Cộng đồng
            </h4>
            <div className="space-y-3">
              <a
                href="https://zalo.me/cafecapital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/6 border border-white/8 hover:border-gold/30 hover:bg-gold/5 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-gold transition-colors">Zalo Cộng đồng</div>
                  <div className="text-xs text-white/45">Kết nối nhà đầu tư</div>
                </div>
              </a>
              <a
                href="https://zalo.me/cafecapital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/6 border border-white/8 hover:border-gold/30 hover:bg-gold/5 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4.5 h-4.5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-gold transition-colors">Mở tài khoản</div>
                  <div className="text-xs text-white/45">Đăng ký thành viên</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Cafe Capital. All rights reserved.
          </p>
          <p className="text-xs text-white/25 text-center">
            Nội dung trên website chỉ mang tính tham khảo, không phải khuyến nghị đầu tư.
          </p>
        </div>
      </div>
    </footer>
  );
}
