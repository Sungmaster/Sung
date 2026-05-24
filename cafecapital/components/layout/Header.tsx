"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  LogIn,
  Menu,
  X,
  TrendingUp,
  ChevronDown,
  Coffee,
} from "lucide-react";
import { menuItems } from "@/data/mockData";
import type { MenuItem } from "@/types";

function DropdownMenu({ items }: { items: MenuItem["children"] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-slide-down">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2.5 text-sm text-text-dark hover:bg-soft-gray hover:text-mid-teal font-medium transition-colors duration-150"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white/98 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-deep-teal group-hover:bg-mid-teal transition-colors duration-200">
                <Coffee className="w-4.5 h-4.5 text-gold" />
                <TrendingUp className="absolute -top-1 -right-1 w-3.5 h-3.5 text-gold" />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl font-semibold text-deep-teal tracking-tight">
                  Cafe
                </span>
                <span
                  className="font-serif text-xl font-semibold tracking-tight ml-1"
                  style={{ color: "#DFA15F" }}
                >
                  Capital
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {menuItems.map((item) => (
                <div key={item.href} className="relative">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-dark hover:text-mid-teal rounded-lg hover:bg-soft-gray transition-all duration-150 cursor-pointer"
                    onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {openDropdown === item.label && (
                    <div
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <DropdownMenu items={item.children} />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center">
                {searchOpen ? (
                  <div className="flex items-center gap-2 bg-soft-gray rounded-full px-3 py-1.5 border border-gray-200">
                    <Search className="w-4 h-4 text-text-muted shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Tìm kiếm mã CP, báo cáo..."
                      className="bg-transparent text-sm text-text-dark placeholder:text-text-muted outline-none w-48"
                      onBlur={() => setSearchOpen(false)}
                    />
                    <button onClick={() => setSearchOpen(false)}>
                      <X className="w-3.5 h-3.5 text-text-muted hover:text-text-dark" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-lg text-text-muted hover:text-mid-teal hover:bg-soft-gray transition-all duration-150 cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>

              <Link
                href="/dang-nhap"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-text-dark hover:text-mid-teal border border-gray-200 hover:border-mid-teal/40 rounded-full transition-all duration-150"
              >
                <LogIn className="w-3.5 h-3.5" />
                Đăng nhập
              </Link>

              <Link
                href="#goi-dich-vu"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #0E5A5F, #003C3F)" }}
              >
                Gói Dịch Vụ
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg text-text-dark hover:bg-soft-gray transition-colors cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {/* Mobile search */}
              <div className="flex items-center gap-2 bg-soft-gray rounded-xl px-3 py-2.5 mb-3">
                <Search className="w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mã CP, báo cáo, tin tức..."
                  className="bg-transparent text-sm text-text-dark placeholder:text-text-muted outline-none flex-1"
                />
              </div>

              {menuItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-semibold text-text-dark hover:text-mid-teal hover:bg-soft-gray rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-text-muted hover:text-mid-teal hover:bg-soft-gray rounded-lg transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <Link
                  href="/dang-nhap"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-text-dark border border-gray-200 rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Đăng nhập
                </Link>
                <Link
                  href="#goi-dich-vu"
                  className="flex items-center justify-center w-full py-2.5 text-sm font-semibold text-white rounded-xl"
                  style={{ background: "linear-gradient(135deg, #0E5A5F, #003C3F)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Gói Dịch Vụ
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
