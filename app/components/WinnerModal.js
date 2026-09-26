"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Trophy,
  X,
  Sparkles,
  Gamepad2,
  MapPin,
  Phone,
  ExternalLink,
  ArrowRight,
  Clock,
} from "lucide-react";
import { playYayyy } from "../utils/audio";
import { getCustomerSession, saveCustomerSession } from "../utils/session";

export default function WinnerModal({ prize, isOpen, onClose, customerName }) {
  const router = useRouter();
  const hasPlayedRef = useRef(false);
  const [countdown, setCountdown] = useState(5);
  const [name, setName] = useState(customerName || "");

  // Sync customer name from prop or session
  useEffect(() => {
    if (customerName) {
      setName(customerName);
    } else {
      const sess = getCustomerSession();
      if (sess?.name) setName(sess.name);
    }
  }, [customerName, isOpen]);

  // Persist prize 1 to session and trigger celebrations & 5s auto-redirect
  useEffect(() => {
    if (isOpen && prize) {
      // Save prize1 to customer session
      saveCustomerSession({ prize1: prize });

      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        try {
          // 🎉 Yayyy! sound
          playYayyy(false);

          // Multi-wave confetti celebration
          confetti({
            particleCount: 140,
            spread: 90,
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
            scalar: 1.2,
          });

          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 55,
              spread: 70,
              origin: { x: 0.02, y: 0.6 },
              colors: ["#f59e0b", "#ef4444", "#ffffff"],
            });
            confetti({
              particleCount: 80,
              angle: 125,
              spread: 70,
              origin: { x: 0.98, y: 0.6 },
              colors: ["#7c3aed", "#10b981", "#ffffff"],
            });
          }, 250);

          setTimeout(() => {
            confetti({
              particleCount: 50,
              spread: 120,
              origin: { y: 0.25 },
              shapes: ["circle"],
              colors: ["#fef08a", "#f59e0b", "#fbbf24"],
              scalar: 0.9,
            });
          }, 520);
        } catch {
          /* ignore */
        }
      }

      // Reset countdown to 5
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);

      const redirectTimeout = setTimeout(() => {
        router.push("/cashpatti");
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

  const handleGoToCashpatti = () => {
    onClose?.();
    router.push("/cashpatti");
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
          background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${prize.cabinColor || "#f59e0b"
            }28 0%, transparent 70%)`,
        }}
      />

      {/* ── MODAL CARD ── */}
      <div
        className="relative w-full max-w-[430px] overflow-hidden"
        style={{ animation: "popIn 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Outer golden gradient border */}
        <div
          className="absolute inset-0 rounded-[34px] p-[2.5px] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(160deg, #fde68a, #f59e0b, #d97706, #fbbf24, #f59e0b)",
          }}
        />

        {/* Card body */}
        <div className="relative z-10 m-[2.5px] rounded-[32px] overflow-hidden bg-white flex flex-col">
          {/* ── TOP HERO ZONE (full-bleed image) ── */}
          <div
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{
              minHeight: "290px",
              background: `radial-gradient(ellipse at 50% 40%, ${prize.cabinColor || "#f59e0b"
                }18 0%, #f8fafc 55%, #f1f5f9 100%)`,
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
              <g
                fill={prize.cabinColor || "#f59e0b"}
                transform="translate(200,155)"
              >
                {Array.from({ length: 16 }).map((_, i) => {
                  const a = (i * 22.5 * Math.PI) / 180;
                  const r = 185;
                  return (
                    <polygon
                      key={i}
                      points={`0,0 ${Math.cos(a - 0.07) * r},${Math.sin(a - 0.07) * r
                        } ${Math.cos(a + 0.07) * r},${Math.sin(a + 0.07) * r}`}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Prize badge top-right */}
            <div className="absolute top-4 right-4 z-20">
              <span
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-[11px] font-black tracking-wide uppercase shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${prize.cabinColor || "#f59e0b"
                    }, #f59e0b)`,
                }}
              >
                {prize.badge || "🏆 WHEEL PRIZE 1"}
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

            {/* 3D floor shadow */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 rounded-full bg-slate-800/15 blur-[10px] z-0" />

            {/* MASSIVE product image */}
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

          {/* ── CONTENT SECTION ── */}
          <div className="px-5 pb-5 pt-3 flex flex-col gap-0 text-center">
            {/* Customer Winner Ribbon with Personalized Name */}
            <div className="flex justify-center -mt-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-500/30">
                <Trophy className="w-3.5 h-3.5 text-amber-200 drop-shadow" />
                <span>
                  {name
                    ? `बधाई छ, ${name}! (WINNER)`
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

            {/* 5-Second Automatic Redirect Notice & Progress Bar */}
            <div className="mt-3 rounded-2xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 text-white p-3 border border-purple-500/40 shadow-md">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>क्यास पत्ती खेलमा जाँदैछ...</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px]">
                  {countdown}s
                </span>
              </div>
              <p className="text-[11px] text-purple-200/90 text-left">
                दोस्रो उपहार जित्न स्वतः क्यास पत्तीमा रिडाइरेक्ट हुँदैछ (अहिले नै खेल्न तल थिच्नुहोस्):
              </p>
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-purple-950/60 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${(countdown / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Action Button: Play CashPatti Immediately */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleGoToCashpatti}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:to-amber-500 border border-white/20"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 pointer-events-none" />
                <Gamepad2 className="w-4 h-4 text-amber-300" />
                <span>अहिले नै खेल्नुहोस्: CASHPATTI ➔</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframe animations */}
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
