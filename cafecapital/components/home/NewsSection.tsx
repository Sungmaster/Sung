"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, User, ArrowRight, Zap, ChevronRight, Lock, Search, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { newsArticles, quickNews } from "@/data/mockData";
import type { NewsArticle } from "@/types";

type Category = "Tất cả" | "Kinh tế vĩ mô" | "Thị trường" | "Doanh nghiệp";

const categories: Category[] = ["Tất cả", "Kinh tế vĩ mô", "Thị trường", "Doanh nghiệp"];

const categoryColors: Record<string, string> = {
  "Kinh tế vĩ mô": "bg-blue-50 text-blue-700",
  "Thị trường": "bg-teal-50 text-teal-700",
  "Doanh nghiệp": "bg-amber-50 text-amber-700",
};

function NewsCard({ article, featured }: { article: NewsArticle; featured?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      className={`group flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-mid-teal/20 hover:shadow-md bg-white transition-all duration-200 cursor-pointer ${
        featured ? "flex-col" : ""
      }`}
    >
      {/* Image placeholder */}
      <div
        className={`shrink-0 rounded-xl bg-gradient-to-br from-soft-gray to-gray-200 ${
          featured ? "w-full h-44" : "w-20 h-20 sm:w-24 sm:h-24"
        } overflow-hidden`}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #003C3F15, #DFA15F20)" }}
        >
          <span className="text-3xl font-serif text-deep-teal/20 font-bold">CC</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${
              categoryColors[article.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {article.category}
          </span>
        </div>

        <h3
          className={`font-semibold text-text-dark group-hover:text-mid-teal transition-colors line-clamp-2 ${
            featured ? "text-base mb-2" : "text-sm mb-1.5"
          }`}
        >
          {article.title}
        </h3>

        {featured && (
          <p className="text-sm text-text-muted line-clamp-2 mb-3">{article.summary}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.publishedAt}
          </span>
          {article.author && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filtered = newsArticles
    .filter((a) => activeCategory === "Tất cả" || a.category === activeCategory)
    .filter((a) =>
      searchQuery.trim() === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.author ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.publishedAt.localeCompare(a.publishedAt)
        : a.publishedAt.localeCompare(b.publishedAt)
    );

  return (
    <section id="tin-moi" className="py-16 sm:py-20 bg-soft-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-mid-teal uppercase tracking-widest mb-2">
              Tin tức
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-teal">
              Tin mới từ thị trường
            </h2>
          </div>
          <Link
            href="/tin-moi"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors shrink-0"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: News articles */}
          <div className="lg:col-span-2">
            {/* Search + Sort bar */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="flex items-center gap-2 flex-1 bg-white rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-mid-teal/40 transition-colors shadow-sm">
                <Search className="w-4 h-4 text-text-muted shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo tên bài, mã CP..."
                  className="flex-1 bg-transparent text-sm text-text-dark placeholder:text-text-muted outline-none"
                />
              </div>
              <button
                onClick={() => setSortOrder((s) => (s === "newest" ? "oldest" : "newest"))}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-mid-teal/40 text-sm font-medium text-text-muted hover:text-mid-teal transition-all duration-150 cursor-pointer shrink-0 shadow-sm"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sortOrder === "newest" ? "Mới nhất" : "Cũ nhất"}
              </button>
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-deep-teal text-white"
                      : "bg-white text-text-muted border border-gray-200 hover:border-mid-teal/30 hover:text-mid-teal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured news */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {filtered.slice(0, 1).map((article) => (
                  <NewsCard key={article.id} article={article} featured />
                ))}
                {filtered.slice(1, 4).map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Paywall note */}
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100">
              <Lock className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700">
                <span className="font-semibold">Miễn phí xem 5 tin mới nhất.</span>{" "}
                Nâng cấp để xem lưu trữ đầy đủ và nhận tin theo danh mục.
              </p>
            </div>
          </div>

          {/* Right: Quick news */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
              {/* Header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold" />
                  <h3 className="font-semibold text-text-dark text-sm">Tin nhanh thị trường</h3>
                </div>
                <span className="ml-auto flex items-center gap-1 text-xs text-positive font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
                  Live
                </span>
              </div>

              {/* Timeline */}
              <div className="px-4 py-3 space-y-1">
                {quickNews.map((item, i) => (
                  <div
                    key={item.id}
                    className="relative flex gap-3 py-3 group cursor-pointer"
                  >
                    {/* Timeline line */}
                    {i < quickNews.length - 1 && (
                      <div className="absolute left-[15px] top-9 bottom-0 w-px bg-gray-100" />
                    )}
                    {/* Dot */}
                    <div className="relative shrink-0 mt-0.5">
                      <div
                        className={`w-2 h-2 rounded-full border-2 ${
                          i === 0
                            ? "border-gold bg-gold"
                            : "border-gray-300 bg-white group-hover:border-mid-teal"
                        } transition-colors`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-dark leading-snug group-hover:text-mid-teal transition-colors">
                        {item.content}
                      </p>
                      <span className="text-xs text-text-muted mt-1 block">{item.publishedAt}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-mid-teal shrink-0 mt-1 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-100 bg-soft-gray/30">
                <Link
                  href="/tin-moi"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors"
                >
                  Xem tất cả tin nhanh <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
