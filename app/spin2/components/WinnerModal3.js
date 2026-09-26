"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Trophy,
  X,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { playYayyy } from "../../utils/audio";

/**
 * WinnerModal3 – Post Spin 3 celebration.
 * Shows the won prize with a 5-second countdown, then redirects to /?celebrate=grand
 * to show the Grand Triple Winner modal with all 3 prizes.
 */
export default function WinnerModal3({ prize, isOpen, onClose, customerName }) {
  const router = useRouter();
  const hasPlayedRef = useRef(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen && prize) {
      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        try {
          playYayyy(false);

          confetti({
            particleCount: 160,
            spread: 95,
            origin: { y: 0.5 },
            colors: [
              "#dc2626",
              "#ea580c",
              "#f59e0b",
              "#10b981",
              "#2563eb",
              "#7c3aed",
              "#ffffff",
            ],
            scalar: 1.25,
          });

          setTimeout(() => {
            confetti({
              particleCount: 90,
              angle: 55,
              spread: 70,
              origin: { x: 0.02, y: 0.6 },
              colors: ["#f59e0b", "#ef4444", "#ffffff"],
            });
            confetti({
              particleCount: 90,
              angle: 125,
              spread: 70,
              origin: { x: 0.98, y: 0.6 },
              colors: ["#7c3aed", "#10b981", "#ffffff"],
            });
          }, 300);

          setTimeout(() => {
            confetti({
              particleCount: 60,
              spread: 130,
              origin: { y: 0.2 },
              shapes: ["circle"],
              colors: ["#fef08a", "#f59e0b", "#fbbf24"],
              scalar: 0.9,
            });
          }, 600);
        } catch {
          /* ignore */
        }
      }

      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);

      const redirectTimeout = setTimeout(() => {
        router.push("/?celebrate=grand");
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimeout);
      };
    }

    if (!isOpen) {
      hasPlayedRef.current = false;
      setCountdown(5);
    }
  }, [isOpen, prize, router]);

  if (!isOpen || !prize) return null;

  const displayName = prize.name || prize.fullName || "Prize";

  const handleGoToCelebration = () => {
    onClose?.();
    router.push("/?celebrate=grand");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-lg select-none"
      style={{ animation: "fadeIn 0.22s ease-out" }}
    >
      {/* Ambient colored glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${prize.cabinColor || "#f59e0b"}28 0%, transparent 70%)`,
        }}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-[430px] overflow-hidden"
        style={{ animation: "popIn 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Golden border */}
        <div
          className="absolute inset-0 rounded-[34px] p-[2.5px] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(160deg, #fde68a, #f59e0b, #d97706, #fbbf24, #f59e0b)",
          }}
        />

        {/* Card body */}
        <div className="relative z-10 m-[2.5px] rounded-[32px] overflow-hidden bg-white flex flex-col">
          {/* Hero image zone */}
          <div
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{
              minHeight: "290px",
              background: `radial-gradient(ellipse at 50% 40%, ${prize.cabinColor || "#f59e0b"}18 0%, #f8fafc 55%, #f1f5f9 100%)`,
            }}
          >
            {/* Rotating sunburst */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 310"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: "rotateSlow 22s linear infinite",
                opacity: 0.13,
              }}
            >
              <g fill={prize.cabinColor || "#f59e0b"} transform="translate(200,155)">
                {Array.from({ length: 16 }).map((_, i) => {
                  const a = (i * 22.5 * Math.PI) / 180;
                  const r = 185;
                  return (
                    <polygon
                      key={i}
                      points={`0,0 ${Math.cos(a - 0.07) * r},${Math.sin(a - 0.07) * r} ${Math.cos(a + 0.07) * r},${Math.sin(a + 0.07) * r}`}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Prize badge */}
            <div className="absolute top-4 right-4 z-20">
              <span
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-[11px] font-black tracking-wide uppercase shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${prize.cabinColor || "#f59e0b"}, #f59e0b)`,
                }}
              >
                {prize.badge || "🏆 WHEEL PRIZE 3"}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-400 hover:text-slate-700 border border-slate-200 flex items-center justify-center transition-all shadow-md z-30 cursor-pointer active:scale-90"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Floor shadow */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 rounded-full bg-slate-800/15 blur-[10px] z-0" />

            {/* Product image */}
            {prize.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={prize.img}
                alt={displayName}
                className="relative z-10 object-contain drop-shadow-2xl"
                style={{
                  width: "220px",
                  height: "220px",
                  animation: "floatPrize 3.2s ease-in-out infinite",
                  filter: "drop-shadow(0 18px 32px rgba(0,0,0,0.22))",
                }}
              />
            ) : (
              <div
                className="text-8xl z-10"
                style={{ animation: "floatPrize 3.2s ease-in-out infinite" }}
              >
                🎁
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-5 pb-5 pt-3 flex flex-col gap-0 text-center">
            {/* Winner ribbon */}
            <div className="flex justify-center -mt-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-500/30">
                <Trophy className="w-3.5 h-3.5 text-amber-200 drop-shadow" />
                <span>
                  {customerName
                    ? `बधाई छ, ${customerName}! (WINNER)`
                    : "विजेता • CONGRATULATIONS!"}
                </span>
                <Sparkles
                  className="w-3.5 h-3.5 text-amber-200"
                  style={{ animation: "spin 4s linear infinite" }}
                />
              </div>
            </div>

            {/* Brand */}
            {prize.brand && (
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full mb-1 mx-auto">
                {prize.brand}
              </span>
            )}

            {/* Product name */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight">
              {displayName}
            </h2>
            {prize.nepaliName && (
              <p className="text-sm font-black text-red-600 mt-0.5 tracking-wide">
                {prize.nepaliName}
              </p>
            )}

            {/* Auto-redirect notice */}
            <div className="mt-3 rounded-2xl bg-gradient-to-r from-amber-900/90 via-yellow-900/90 to-amber-900/90 text-white p-3 border border-amber-500/40 shadow-md">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>सबै ३ उपहारको भव्य उत्सवमा जाँदैछ...</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px]">
                  {countdown}s
                </span>
              </div>
              <p className="text-[11px] text-amber-200/90 text-left">
                तपाईंको सबै ३ वटा उपहार एकैसाथ हेर्न तयार हुनुहोस्! (Viewing all 3 prizes together)
              </p>
              <div className="w-full h-1.5 bg-amber-950/60 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${(countdown / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Action button */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleGoToCelebration}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 border border-white/20"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 pointer-events-none" />
                <Trophy className="w-4 h-4 text-slate-900" />
                <span>सबै ३ उपहार हेर्नुहोस् (VIEW ALL 3) ➔</span>
                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.78) translateY(24px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes floatPrize {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        @keyframes rotateSlow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
