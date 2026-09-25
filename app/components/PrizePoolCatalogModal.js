"use client";

import React, { useState } from "react";
import {
  X, Trophy, ExternalLink, ShieldCheck, Tag,
  SlidersHorizontal, Zap, Search, Package, Sparkles, CheckCircle2,
} from "lucide-react";
import { calculatePrizeOdds } from "../utils/weightedRandom";

export default function PrizePoolCatalogModal({
  isOpen,
  onClose,
  prizes,
  customOdds,             // optional array of % per prize (from admin panel)
  onOpenAdminOdds,        // callback to open the admin odds panel (only passed in /nutadmin)
  onOpenProductEditor,    // callback to open the product editor panel (only passed in /nutadmin)
  isAdmin = false,        // true in /nutadmin route; false in public / route
}) {
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState("price-desc"); // price-desc | price-asc | odds-desc

  if (!isOpen || !prizes) return null;

  // Enrich with calculated odds
  const enriched = calculatePrizeOdds(prizes, 1.0).map((p, i) => ({
    ...p,
    displayOdds: customOdds ? customOdds[p.originalIndex ?? i] : p.probabilityPercent,
  }));

  // Filter
  const filtered = enriched.filter(
    (p) =>
      !search ||
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.nepaliName || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.brand || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === "price-asc") return a.numericPrice - b.numericPrice;
    if (sortMode === "odds-desc" && isAdmin) return b.displayOdds - a.displayOdds;
    return b.numericPrice - a.numericPrice; // default: price-desc
  });

  const hasCustomOdds = !!customOdds;
  const canShowAdminControls = isAdmin || Boolean(onOpenAdminOdds || onOpenProductEditor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200 select-none">
      {/* Modal Card Shell - Warm Festive Dashain / Tihar Theme */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border-2 border-amber-300/90 shadow-[0_25px_70px_rgba(217,119,6,0.35),0_0_35px_rgba(251,191,36,0.25)] animate-in zoom-in-95 duration-200"
        style={{
          background: "linear-gradient(175deg, #fffdf8 0%, #fffbf2 40%, #fef3c7 100%)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="relative flex items-center justify-between gap-3 px-5 pt-4 pb-3.5 border-b border-amber-200/80 shrink-0"
          style={{
            background: "linear-gradient(90deg, #fef3c7 0%, #fee2e2 50%, #fef3c7 100%)",
          }}
        >
          {/* Title with Traditional Festival Aura */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-md shadow-amber-600/25 border border-white/60"
              style={{ background: "linear-gradient(135deg, #dc2626, #ea580c, #f59e0b)" }}
            >
              <Trophy className="w-5 h-5 text-amber-100 drop-shadow" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900 font-black text-base sm:text-lg tracking-tight leading-tight truncate">
                  सबै १० उपहार र मूल्य
                </h2>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-400/30 text-amber-900 border border-amber-400/50 hidden sm:inline">
                  {prizes.length} Genuine Products
                </span>
              </div>
              <p className="text-amber-800/70 text-[11px] font-bold mt-0.5 truncate">
                Alam Tech · New Road &amp; Putalisadak, Kathmandu
              </p>
            </div>
          </div>

          {/* Header controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Change Product Button (Admin Only) */}
            {onOpenProductEditor && (
              <button
                onClick={onOpenProductEditor}
                title="Edit wheel products"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition-all duration-200 cursor-pointer bg-emerald-600 hover:bg-emerald-500 border-emerald-700 text-white shadow-sm hover:shadow"
              >
                <Package size={13} />
                <span className="hidden sm:inline">Change Product</span>
              </button>
            )}

            {/* Admin Odds Button (Admin Only) */}
            {onOpenAdminOdds && (
              <button
                onClick={onOpenAdminOdds}
                title="Open Admin Odds Control Panel"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition-all duration-200 cursor-pointer shadow-sm hover:shadow ${
                  hasCustomOdds
                    ? "bg-violet-600 border-violet-700 text-white"
                    : "bg-amber-500 hover:bg-amber-400 border-amber-600 text-white"
                }`}
              >
                <SlidersHorizontal size={13} />
                <span className="hidden sm:inline">Admin Odds</span>
                {hasCustomOdds && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 border border-amber-200 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Toolbar: search + sort ── */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-amber-50/60 border-b border-amber-200/60 shrink-0">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products, brands…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-amber-200 text-slate-800 text-xs font-bold placeholder:text-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all shadow-xs"
            />
          </div>

          {/* Sort toggle (Public sees Price only; Admin route also gets Odds) */}
          <div className="flex items-center gap-1 bg-amber-100/70 border border-amber-200/90 rounded-xl p-0.5">
            {[
              { id: "price-desc", label: "Price ↓" },
              { id: "price-asc", label: "Price ↑" },
              ...(canShowAdminControls ? [{ id: "odds-desc", label: "Odds ↓" }] : []),
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortMode(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-black transition-all cursor-pointer ${
                  sortMode === opt.id
                    ? "bg-white text-amber-900 shadow-xs border border-amber-200/50"
                    : "text-amber-800/70 hover:text-amber-950"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Custom odds indicator (Admin Only) */}
          {canShowAdminControls && hasCustomOdds && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-violet-100 border border-violet-300">
              <Zap size={11} className="text-violet-600" />
              <span className="text-[10px] font-black text-violet-800">Custom Odds Active</span>
            </div>
          )}
        </div>

        {/* ── Product List (Warm, Crisp Cards) ── */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(217,119,6,0.3) transparent" }}
        >
          {sorted.map((product, idx) => {
            const pct = product.displayOdds ?? 0;
            const isExcluded = pct < 0.01;

            const barColor = isExcluded
              ? "#94a3b8"
              : pct >= 10
              ? "#16a34a"
              : pct >= 4
              ? "#2563eb"
              : pct >= 1
              ? "#ea580c"
              : "#dc2626";

            const barWidth = Math.min(100, (pct / 15) * 100);

            return (
              <div
                key={product.id || idx}
                className="group flex items-center gap-3.5 rounded-2xl px-3.5 py-2.5 bg-white/90 hover:bg-white border-2 border-amber-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all duration-200"
                style={{
                  borderLeftColor: product.cabinColor || "#f59e0b",
                  borderLeftWidth: "4px",
                }}
              >
                {/* Rank Number */}
                <span className="w-6 h-6 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-[11px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                {/* Product Thumbnail Showcase */}
                <div
                  className="w-13 h-13 rounded-xl shrink-0 flex items-center justify-center overflow-hidden border border-amber-200/80 shadow-inner p-1"
                  style={{
                    background: "radial-gradient(circle, #ffffff 40%, #fef3c7 100%)",
                  }}
                >
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-xs"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xl">🎁</span>
                  )}
                </div>

                {/* Product Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-900 text-sm font-black truncate">
                      {product.name}
                    </span>
                    {(product.badge || product.tag) && (
                      <span className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white uppercase tracking-wider shadow-xs">
                        {product.badge || product.tag}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-red-600 mt-0.5 truncate">
                    {product.nepaliName || "दशैं तिहार उपहार"}
                    {product.brand && (
                      <span className="text-slate-400 font-medium ml-1.5">
                        • {product.brand}
                      </span>
                    )}
                  </div>

                  {/* ADMIN ROUTE ONLY: Odds Slider Bar & Percentages */}
                  {canShowAdminControls ? (
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${barWidth}%`, background: barColor }}
                        />
                      </div>
                      <span
                        className="text-[10.5px] font-mono font-black shrink-0"
                        style={{ color: isExcluded ? "#94a3b8" : barColor }}
                      >
                        {isExcluded ? "0%" : `${pct}%`}
                      </span>
                    </div>
                  ) : (
                    /* PUBLIC ROUTE: Clean Description & Genuine Product Tag */
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {product.description || "Official Alam Tech Genuine Promotional Prize"}
                    </p>
                  )}
                </div>

                {/* Price Tag & Official Store Link */}
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs">
                    <Tag size={11} className="text-emerald-600" />
                    <span className="text-emerald-700 text-xs sm:text-sm font-black">
                      {product.value || `Rs. ${product.numericPrice?.toLocaleString()}`}
                    </span>
                  </div>
                  {product.url && (
                    <div>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[10px] text-amber-800/60 hover:text-amber-900 font-bold transition-colors mt-0.5"
                      >
                        <ExternalLink size={9} />
                        <span>alamtech.com.np</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-amber-900/40">
              <Search size={32} className="mb-2 opacity-50" />
              <span className="text-sm font-black">कुनै उपहार भेटिएन (No products match)</span>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-3 border-t border-amber-200 shrink-0"
          style={{ background: "#fef3c7" }}
        >
          <div className="flex items-center gap-1.5 text-amber-900/80 text-xs font-bold">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span className="truncate">१००% Genuine Products · Official Store · Alam Tech</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-black text-xs text-white transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg active:scale-95 shrink-0"
            style={{
              background: "linear-gradient(135deg, #ea580c, #f59e0b)",
              border: "1px solid #c2410c",
            }}
          >
            फर्कनुहोस् (Back to Wheel)
          </button>
        </div>
      </div>
    </div>
  );
}
