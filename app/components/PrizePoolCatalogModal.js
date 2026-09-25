"use client";

import React, { useState } from "react";
import {
  X, Trophy, ExternalLink, ShieldCheck, Tag,
  SlidersHorizontal, Zap, Search, Package,
} from "lucide-react";
import { calculatePrizeOdds } from "../utils/weightedRandom";

export default function PrizePoolCatalogModal({
  isOpen,
  onClose,
  prizes,
  customOdds,             // optional array of % per prize (from admin panel)
  onOpenAdminOdds,        // callback to open the admin odds panel
  onOpenProductEditor,    // callback to open the product editor panel
}) {
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState("price-desc"); // price-desc | price-asc | odds-desc

  if (!isOpen || !prizes) return null;

  // Enrich with calculated odds (inverse-price baseline), then override if admin odds present
  const enriched = calculatePrizeOdds(prizes, 1.0).map((p, i) => ({
    ...p,
    displayOdds: customOdds ? customOdds[p.originalIndex ?? i] : p.probabilityPercent,
  }));

  // Filter
  const filtered = enriched.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand || "").toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === "price-asc") return a.numericPrice - b.numericPrice;
    if (sortMode === "odds-desc") return b.displayOdds - a.displayOdds;
    return b.numericPrice - a.numericPrice; // default: price-desc
  });

  const hasCustomOdds = !!customOdds;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        style={{ background: "linear-gradient(160deg, #0d0d1c 0%, #111827 60%, #0a0f1e 100%)" }}
      >
        {/* ── Header ── */}
        <div
          className="relative flex items-center justify-between gap-3 px-5 pt-5 pb-4 border-b border-white/8"
          style={{ background: "linear-gradient(90deg, rgba(251,191,36,0.10) 0%, rgba(239,68,68,0.07) 100%)" }}
        >
          {/* Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #b45309, #f59e0b)" }}
            >
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-black text-base sm:text-lg tracking-tight leading-tight truncate">
                Prize Pool — 12 Products
              </h2>
              <p className="text-white/35 text-[11px] font-medium mt-0.5">
                Alam Tech · New Road &amp; Putalisadak, Kathmandu
              </p>
            </div>
          </div>

          {/* Header controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Change Product Button */}
            {onOpenProductEditor && (
              <button
                onClick={onOpenProductEditor}
                title="Edit wheel products"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 cursor-pointer bg-white/5 border-white/10 text-white/50 hover:bg-emerald-500/12 hover:border-emerald-400/30 hover:text-emerald-300"
              >
                <Package size={13} />
                <span className="hidden sm:inline">Change Product</span>
              </button>
            )}

            {/* Admin Odds Button */}
            {onOpenAdminOdds && (
              <button
                onClick={onOpenAdminOdds}
                title="Open Admin Odds Control Panel"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 cursor-pointer ${
                  hasCustomOdds
                    ? "bg-violet-500/20 border-violet-400/40 text-violet-300"
                    : "bg-white/5 border-white/10 text-white/50 hover:bg-violet-500/12 hover:border-violet-400/30 hover:text-violet-300"
                }`}
              >
                <SlidersHorizontal size={13} />
                <span className="hidden sm:inline">Admin Odds</span>
                {hasCustomOdds && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Toolbar: search + sort ── */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/80 text-xs font-medium placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/8 transition-all"
            />
          </div>

          {/* Sort toggle */}
          <div className="flex items-center gap-1 bg-white/4 border border-white/8 rounded-lg p-0.5">
            {[
              { id: "price-desc", label: "Price ↓" },
              { id: "price-asc", label: "Price ↑" },
              { id: "odds-desc", label: "Odds ↓" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortMode(opt.id)}
                className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold transition-all cursor-pointer ${
                  sortMode === opt.id
                    ? "bg-white/10 text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Custom odds indicator */}
          {hasCustomOdds && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/12 border border-violet-500/20">
              <Zap size={11} className="text-violet-400" />
              <span className="text-[10.5px] font-bold text-violet-300">Custom Odds</span>
            </div>
          )}
        </div>

        {/* ── Product List ── */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
        >
          {sorted.map((product, idx) => {
            const pct = product.displayOdds ?? 0;
            const isExcluded = pct < 0.01;

            const barColor = isExcluded
              ? "#374151"
              : pct >= 10
              ? "#10b981"
              : pct >= 4
              ? "#3b82f6"
              : pct >= 1
              ? "#f59e0b"
              : "#ef4444";

            const barWidth = Math.min(100, (pct / 15) * 100); // scale bar: 15% = full

            return (
              <div
                key={product.id || idx}
                className={`group flex items-center gap-3.5 rounded-xl px-3.5 py-3 border transition-all duration-150 ${
                  isExcluded
                    ? "border-white/4 opacity-40"
                    : "border-white/7 hover:border-white/14 hover:bg-white/3"
                }`}
                style={{ borderLeftColor: product.cabinColor || "#3b82f6", borderLeftWidth: "3px" }}
              >
                {/* Rank */}
                <span className="text-white/20 text-[11px] font-mono font-bold w-5 shrink-0 text-right">
                  {idx + 1}
                </span>

                {/* Thumbnail */}
                <div className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center overflow-hidden bg-black/30 border border-white/8">
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="text-xl">🎁</span>
                  )}
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-xs font-bold truncate">{product.name}</span>
                    {product.badge && (
                      <span
                        className="text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0"
                        style={{ background: `${product.cabinColor}30`, color: product.cabinColor, border: `1px solid ${product.cabinColor}50` }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-white/30 text-[10px] font-medium mt-0.5 truncate">
                    {product.brand} · {product.nepaliName}
                  </div>
                  {/* Odds bar */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-white/6 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, background: barColor }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-mono font-black shrink-0"
                      style={{ color: isExcluded ? "#6b7280" : barColor }}
                    >
                      {isExcluded ? "—" : `${pct}%`}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Tag size={10} className="text-emerald-500" />
                    <span className="text-emerald-400 text-xs font-black">
                      {product.value || `Rs. ${product.numericPrice?.toLocaleString()}`}
                    </span>
                  </div>
                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-[9.5px] text-white/20 hover:text-white/50 transition-colors mt-0.5 cursor-pointer"
                    >
                      <ExternalLink size={8} />
                      <span>alamtech.com.np</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-white/20">
              <Search size={32} className="mb-3 opacity-40" />
              <span className="text-sm font-bold">No products match</span>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-white/8"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <div className="flex items-center gap-1.5 text-white/25 text-[11px]">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>100% Genuine · Official Warranty · Alam Tech</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-black text-xs text-white transition-all duration-150 cursor-pointer active:scale-95"
            style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Back to Wheel
          </button>
        </div>
      </div>
    </div>
  );
}
