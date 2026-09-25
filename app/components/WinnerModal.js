"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  X,
  RotateCcw,
  MapPin,
  Phone,
  ExternalLink,
  Sparkles,
  Gift,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

export default function WinnerModal({ prize, isOpen, onClose, onSpinAgain }) {
  const [copied, setCopied] = useState(false);

  // Compute realistic promotional claim voucher code for Alam Tech
  const voucherCode = React.useMemo(() => {
    if (!prize) return "";
    const prefix = prize.id ? prize.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 4).toUpperCase() : "WIN";
    return `ALAM-${prefix}-2026`;
  }, [prize]);

  useEffect(() => {
    if (isOpen && prize) {
      try {
        // Multi-stage fireworks & confetti celebration
        // 1. Initial center burst
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#dc2626", "#ea580c", "#f59e0b", "#10b981", "#2563eb", "#7c3aed"],
        });

        // 2. Left and right cannons
        const timer1 = setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 65,
            origin: { x: 0.05, y: 0.65 },
            colors: ["#f59e0b", "#ef4444", "#ffffff"],
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 65,
            origin: { x: 0.95, y: 0.65 },
            colors: ["#2563eb", "#10b981", "#ffffff"],
          });
        }, 220);

        // 3. Falling gold star sparkles
        const timer2 = setTimeout(() => {
          confetti({
            particleCount: 40,
            spread: 100,
            origin: { y: 0.3 },
            shapes: ["circle"],
            colors: ["#fef08a", "#f59e0b", "#d97706"],
          });
        }, 450);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      } catch {
        // Fallback for non-canvas environments
      }
    }
  }, [isOpen, prize]);

  if (!isOpen || !prize) return null;

  const handleCopyCode = () => {
    if (voucherCode) {
      navigator.clipboard?.writeText(voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayName = prize.name || prize.fullName || "Prize";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200 select-none">
      {/* Dynamic Ambient Glow Behind Modal */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full blur-[100px] opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${prize.cabinColor || "#f59e0b"} 0%, #f59e0b 50%, transparent 70%)`,
        }}
      />

      {/* Luxury Golden Border Wrapper */}
      <div className="relative w-full max-w-[410px] p-[2.5px] rounded-[32px] bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),0_0_40px_rgba(245,158,11,0.35)] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Inner Card Shell */}
        <div className="relative w-full bg-gradient-to-b from-amber-50/70 via-white to-white rounded-[30px] p-5 sm:p-6 text-center overflow-hidden">
          {/* Subtle Top Confetti Background Overlay */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-transparent to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-slate-100 text-slate-400 hover:text-slate-700 border border-slate-200 flex items-center justify-center transition-all shadow-sm z-30 cursor-pointer active:scale-90"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Festive Winner Ribbon */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-red-500/25 mb-1 z-20 relative">
            <Trophy className="w-4 h-4 text-amber-200 drop-shadow" />
            <span>विजेता • CONGRATULATIONS!</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: "4s" }} />
          </div>

          <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800/80 mb-2">
            Alam Tech Spin The Wheel
          </div>

          {/* 3D Hero Product Showcase Dome */}
          <div
            className="w-full h-44 sm:h-48 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 shadow-inner my-2"
            style={{
              borderColor: `${prize.cabinColor || "#f59e0b"}40`,
              background:
                "radial-gradient(circle, #ffffff 20%, #f8fafc 65%, #f1f5f9 100%)",
            }}
          >
            {/* Rotating Sunburst Rays Background */}
            <svg
              className="absolute inset-0 w-full h-full animate-rotate-rays opacity-25 pointer-events-none"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill={prize.cabinColor || "#f59e0b"}>
                <polygon points="100,100 95,0 105,0" />
                <polygon points="100,100 167,33 174,40" />
                <polygon points="100,100 200,95 200,105" />
                <polygon points="100,100 174,160 167,167" />
                <polygon points="100,100 105,200 95,200" />
                <polygon points="100,100 33,167 26,160" />
                <polygon points="100,100 0,105 0,95" />
                <polygon points="100,100 26,40 33,33" />
                <polygon points="100,100 135,14 142,20" />
                <polygon points="100,100 190,58 194,66" />
                <polygon points="100,100 194,134 190,142" />
                <polygon points="100,100 142,180 135,186" />
                <polygon points="100,100 65,186 58,180" />
                <polygon points="100,100 10,142 6,134" />
                <polygon points="100,100 6,66 10,58" />
                <polygon points="100,100 58,20 65,14" />
              </g>
            </svg>

            {/* Floating Badge / Tag in Top Corner */}
            <div className="absolute top-2.5 right-2.5 z-20">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] font-black tracking-wider uppercase shadow-md shadow-red-500/30">
                {prize.badge || prize.tag || "🏆 WINNER"}
              </span>
            </div>

            {/* Simulated 3D Floor Shadow */}
            <div className="w-36 h-4 rounded-[100%] bg-slate-400/30 blur-[4px] absolute bottom-3 z-0" />

            {/* Massive Hero Product Visual */}
            {prize.img ? (
              <img
                src={prize.img}
                alt={prize.name}
                className="w-32 h-32 sm:w-36 sm:h-36 object-contain z-10 drop-shadow-xl animate-float-product transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="text-6xl z-10 animate-float-product">🎁</div>
            )}
          </div>

          {/* Product Brand Tag */}
          {prize.brand && (
            <div className="inline-block mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
                {prize.brand}
              </span>
            </div>
          )}

          {/* Product Titles */}
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mt-1">
            {displayName}
          </h3>
          {prize.nepaliName && (
            <p className="text-sm font-black text-red-600 mt-0.5 tracking-wide">
              {prize.nepaliName}
            </p>
          )}
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed line-clamp-2">
            {prize.description || prize.desc || "Genuine Prize from Alam Tech"}
          </p>

          {/* Golden Prize Value Plaque */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 border border-amber-300/80 rounded-2xl p-2.5 my-3 shadow-sm flex items-center justify-between">
            <div className="text-left flex flex-col">
              <span className="text-[9.5px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Prize Value
              </span>
              <span className="text-[11px] text-amber-900/70 font-semibold">
                Genuine Product
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight drop-shadow-sm">
                {prize.value}
              </span>
            </div>
          </div>

          {/* Store Claim Certificate & Voucher Code */}
          <div className="bg-slate-50 rounded-2xl p-3 mb-3.5 text-left border border-slate-200/80 flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-bold">Claim Voucher:</span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 font-mono font-black text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200 transition cursor-pointer"
                title="Click to copy voucher code"
              >
                <span>{voucherCode}</span>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-blue-600" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-bold">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Alam Tech: New Road & Putalisadak, Kathmandu</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>+977 985-1193787</span>
              </div>
              {prize.url && (
                <a
                  href={prize.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <span>alamtech.com.np</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>

          {/* High-Impact Action Buttons */}
          <div className="flex gap-2.5 justify-center">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-3.5 rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition active:scale-95 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-red-500" />
              <span>Claim at Store</span>
            </button>
            <button
              onClick={() => {
                onClose();
                if (onSpinAgain) onSpinAgain();
              }}
              className="flex-1 py-3 px-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs hover:shadow-lg hover:shadow-orange-500/30 transition active:scale-95 shadow-md flex items-center justify-center gap-1.5 cursor-pointer relative overflow-hidden group"
            >
              {/* Shimmer Light Reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />
              <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-90 duration-300" />
              <span>Spin Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
