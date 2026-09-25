"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Zap, RotateCcw, Lock, Unlock, AlertTriangle, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { getNumericPrice } from "../utils/weightedRandom";

/**
 * Computes the inverse-price hierarchy weights (same logic as weightedRandom.js)
 * Returns an array of percentages [0..100] that sum to 100.
 */
function computeSmartHierarchy(prizes) {
  const prices = prizes.map((p) => getNumericPrice(p));
  const rawWeights = prices.map((p) => 1 / p);
  const total = rawWeights.reduce((s, w) => s + w, 0);
  return rawWeights.map((w) => Math.round((w / total) * 10000) / 100); // 2 decimal places
}

/**
 * Normalises an array of raw values so they sum to 100, rounding cleanly.
 */
function normalise(values) {
  const total = values.reduce((s, v) => s + v, 0);
  if (total === 0) return values.map(() => 100 / values.length);
  const scaled = values.map((v) => (v / total) * 100);
  // Fix rounding error on last item
  const rounded = scaled.map((v) => Math.round(v * 100) / 100);
  const diff = 100 - rounded.reduce((s, v) => s + v, 0);
  rounded[rounded.length - 1] = Math.round((rounded[rounded.length - 1] + diff) * 100) / 100;
  return rounded;
}

export default function AdminOddsPanel({ isOpen, onClose, prizes, onOddsChange }) {
  // rawValues: unnormalized slider values per prize (used for smooth dragging)
  const [rawValues, setRawValues] = useState([]);
  const [isSmartMode, setIsSmartMode] = useState(true);
  const [justSaved, setJustSaved] = useState(false);

  // Initialise or reset whenever prizes or panel open state changes
  useEffect(() => {
    if (isOpen && prizes?.length) {
      const smart = computeSmartHierarchy(prizes);
      setRawValues(smart);
      setIsSmartMode(true);
    }
  }, [isOpen, prizes]);

  // Derive normalised display values
  const displayOdds = normalise(rawValues.length ? rawValues : prizes?.map(() => 1) ?? []);

  const handleSliderChange = useCallback((index, newVal) => {
    setIsSmartMode(false);
    setRawValues((prev) => {
      const next = [...prev];
      next[index] = Math.max(0, Math.min(100, Number(newVal)));
      return next;
    });
  }, []);

  const handleSmartHierarchy = useCallback(() => {
    const smart = computeSmartHierarchy(prizes);
    setRawValues(smart);
    setIsSmartMode(true);
  }, [prizes]);

  const handleApply = useCallback(() => {
    onOddsChange(displayOdds);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }, [displayOdds, onOddsChange]);

  if (!isOpen || !prizes?.length) return null;

  const sortedByPrice = [...prizes]
    .map((p, i) => ({ ...p, _origIdx: i, numericPrice: getNumericPrice(p) }))
    .sort((a, b) => b.numericPrice - a.numericPrice);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-lg">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.25)] border border-white/10"
           style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #13111f 60%, #0c1120 100%)" }}>

        {/* ── Header ── */}
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/8"
             style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.10) 100%)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
              <SlidersHorizontal className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <div>
              <h2 className="text-white font-black text-base tracking-tight">Odds Control Panel</h2>
              <p className="text-white/40 text-[11px] font-medium mt-0.5">Admin · Spin probability editor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Smart Hierarchy Button */}
            <button
              onClick={handleSmartHierarchy}
              title="Reset to Inverse-Price Smart Hierarchy"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 cursor-pointer ${
                isSmartMode
                  ? "bg-violet-500/20 border-violet-400/50 text-violet-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-violet-500/15 hover:border-violet-400/40 hover:text-violet-300"
              }`}
            >
              <Zap size={12} className={isSmartMode ? "text-violet-300" : "text-white/40"} />
              <span>Smart Hierarchy</span>
              {isSmartMode && <CheckCircle2 size={11} className="text-violet-400" />}
            </button>

            <button onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Smart Mode Banner ── */}
        {isSmartMode && (
          <div className="flex items-center gap-2.5 px-5 py-2.5 border-b border-white/5"
               style={{ background: "rgba(139,92,246,0.08)" }}>
            <Zap size={13} className="text-violet-400 shrink-0" />
            <p className="text-[11.5px] text-violet-300/80 font-medium">
              <span className="font-black text-violet-300">Smart Hierarchy active</span> — cheaper products have higher odds. Drag a slider to override.
            </p>
          </div>
        )}

        {/* ── Warning if not normalized nicely ── */}
        {!isSmartMode && (
          <div className="flex items-center gap-2.5 px-5 py-2.5 border-b border-white/5"
               style={{ background: "rgba(234,179,8,0.06)" }}>
            <AlertTriangle size={13} className="text-amber-400 shrink-0" />
            <p className="text-[11.5px] text-amber-300/80 font-medium">
              Custom odds active. Values are <span className="font-black text-amber-300">auto-normalised to 100%</span>. Set a slider to 0 to eliminate that prize.
            </p>
          </div>
        )}

        {/* ── Prize Sliders ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
             style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}>
          {sortedByPrice.map((prize) => {
            const oi = prize._origIdx;
            const pct = displayOdds[oi] ?? 0;
            const isZero = pct < 0.01;

            // Colour band based on odds
            const barColor = isZero
              ? "#374151"
              : pct >= 10
              ? "#10b981"   // emerald — high chance
              : pct >= 4
              ? "#3b82f6"   // blue — mid
              : pct >= 1
              ? "#f59e0b"   // amber — low-mid
              : "#ef4444";  // red — very rare

            return (
              <div key={prize.id || oi}
                className={`group relative rounded-xl p-3 border transition-all duration-150 ${
                  isZero
                    ? "border-white/5 bg-white/2 opacity-50"
                    : "border-white/8 bg-white/4 hover:bg-white/6 hover:border-white/12"
                }`}>
                <div className="flex items-center gap-3">
                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden bg-black/30 border border-white/8">
                    {prize.img ? (
                      <img src={prize.img} alt={prize.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-lg">🎁</span>
                    )}
                  </div>

                  {/* Name & price */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs font-bold truncate">{prize.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold shrink-0"
                            style={{ background: `${barColor}22`, color: barColor, border: `1px solid ${barColor}44` }}>
                        {isZero ? "EXCLUDED" : `${pct}%`}
                      </span>
                    </div>
                    <span className="text-white/30 text-[10px] font-medium">
                      {prize.value} · {prize.brand}
                    </span>
                  </div>

                  {/* Lock / 0 toggle */}
                  <button
                    onClick={() => handleSliderChange(oi, isZero ? (computeSmartHierarchy(prizes)[oi]) : 0)}
                    title={isZero ? "Re-include prize" : "Exclude prize (set to 0%)"}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-white/60 hover:bg-white/8 transition-all cursor-pointer shrink-0"
                  >
                    {isZero ? <Unlock size={13} /> : <Lock size={13} />}
                  </button>
                </div>

                {/* Slider */}
                <div className="mt-2.5 px-0.5">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.5}
                    value={rawValues[oi] ?? 0}
                    onChange={(e) => handleSliderChange(oi, e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
                    style={{
                      background: `linear-gradient(to right, ${barColor} 0%, ${barColor} ${rawValues[oi] ?? 0}%, rgba(255,255,255,0.08) ${rawValues[oi] ?? 0}%, rgba(255,255,255,0.08) 100%)`,
                      accentColor: barColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-4 border-t border-white/8 flex items-center justify-between gap-3"
             style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
            <span className="font-mono font-bold text-white/50">
              Total: {displayOdds.reduce((s, v) => Math.round((s + v) * 100) / 100, 0)}%
            </span>
            <span>· {prizes.filter((_, i) => (displayOdds[i] ?? 0) >= 0.01).length} active prizes</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer">
              Cancel
            </button>
            <button onClick={handleApply}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                justSaved
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                  : "text-white border border-violet-500/50 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              }`}
              style={justSaved ? {} : { background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
              {justSaved ? (
                <><CheckCircle2 size={13} /> Applied!</>
              ) : (
                <>Apply Odds</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
