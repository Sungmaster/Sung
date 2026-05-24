"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { marketIndexes } from "@/data/mockData";

export default function MarketTicker() {
  const doubled = [...marketIndexes, ...marketIndexes];

  return (
    <div className="bg-deep-teal border-b border-gold/15 py-0 overflow-hidden ticker-wrapper select-none">
      <div className="flex">
        <div className="flex items-stretch ticker-track animate-ticker whitespace-nowrap">
          {doubled.map((item, i) => (
            <div
              key={`${item.symbol}-${i}`}
              className="flex items-center gap-3 px-5 py-3 border-r border-white/8 shrink-0 hover:bg-white/5 transition-colors duration-150 cursor-default"
            >
              <span className="text-xs font-bold text-white/55 uppercase tracking-wide min-w-[56px]">
                {item.symbol}
              </span>
              <span className="text-sm font-semibold text-white">{item.value}</span>
              <span
                className={`flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded ${
                  item.changePercent >= 0
                    ? "text-positive bg-positive/10"
                    : "text-negative bg-negative/10"
                }`}
              >
                {item.changePercent >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {item.changePercent >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
