"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  Sparkles,
  Gift,
  Phone,
  MapPin,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  X,
} from "lucide-react";
import { playGrandDoubleWinFanfare } from "../utils/audio";

export default function GrandDoubleWinnerModal({
  isOpen,
  onClose,
  sessionData,
  onResetSession,
}) {
  const hasPlayedAudioRef = useRef(false);

  useEffect(() => {
    if (isOpen && sessionData && !hasPlayedAudioRef.current) {
      hasPlayedAudioRef.current = true;
      try {
        // High quality victory fanfare
        playGrandDoubleWinFanfare(false);

        // Multi-wave celebratory confetti particles
        confetti({
          particleCount: 220,
          spread: 100,
          origin: { y: 0.5 },
          colors: [
            "#f59e0b",
            "#ef4444",
            "#10b981",
            "#3b82f6",
            "#8b5cf6",
            "#fde047",
            "#ffffff",
          ],
          scalar: 1.25,
        });

        const t1 = setTimeout(() => {
          confetti({
            particleCount: 120,
            angle: 55,
            spread: 75,
            origin: { x: 0.02, y: 0.65 },
            colors: ["#f59e0b", "#ef4444", "#fef08a"],
          });
          confetti({
            particleCount: 120,
            angle: 125,
            spread: 75,
            origin: { x: 0.98, y: 0.65 },
            colors: ["#7c3aed", "#10b981", "#fef08a"],
          });
        }, 350);

        const t2 = setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 140,
            origin: { y: 0.25 },
            shapes: ["circle"],
            colors: ["#fbbf24", "#f59e0b", "#ea580c"],
            scalar: 1.1,
          });
        }, 750);

        const t3 = setTimeout(() => {
          confetti({
            particleCount: 100,
            angle: 90,
            spread: 120,
            origin: { y: 0.8 },
            colors: ["#38bdf8", "#ec4899", "#f59e0b", "#fff"],
          });
        }, 1200);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      } catch {
        /* ignore */
      }
    }

    if (!isOpen) {
      hasPlayedAudioRef.current = false;
    }
  }, [isOpen, sessionData]);

  if (!isOpen || !sessionData) return null;

  const customerName = sessionData.name || "सम्मानित ग्राहक";
  const customerPhone = sessionData.phone || "";
  const prize1 = sessionData.prize1 || null;
  const prize2 = sessionData.prize2 || null;
  const hasWonCash = Boolean(prize2?.won && prize2?.prizeValue > 0);

  // Render authentic currency notes: 200 = two 100s stacked one behind another, 500 = 500 note, 1000 = 1000 note
  const renderCashRewardImage = () => {
    const val = prize2?.prizeValue ?? 200;

    if (val === 200) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Back 100 Rupee Note (one behind another) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/100nepalirupees.jpg"
            alt="100 Nepali Rupees Note"
            className="absolute max-h-24 sm:max-h-28 w-auto object-contain rounded-xl shadow-xl -rotate-6 -translate-x-5 -translate-y-2 opacity-95 border-2 border-amber-300/40"
          />
          {/* Front 100 Rupee Note */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/100nepalirupees.jpg"
            alt="100 Nepali Rupees Note"
            className="relative z-10 max-h-24 sm:max-h-28 w-auto object-contain rounded-xl shadow-2xl rotate-3 translate-x-3 translate-y-1 border-2 border-amber-300/60"
          />
        </div>
      );
    }

    if (val === 500) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/500rupees.jpeg"
            alt="500 Nepali Rupees Note"
            className="relative z-10 max-h-24 sm:max-h-28 w-auto object-contain rounded-xl shadow-2xl rotate-1 border-2 border-amber-300/60"
          />
        </div>
      );
    }

    // 1000 Rupees Note (or higher)
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/1000rupees.png"
          alt="1000 Nepali Rupees Note"
          className="relative z-10 max-h-24 sm:max-h-28 w-auto object-contain rounded-xl shadow-2xl rotate-1 border-2 border-amber-300/60"
        />
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xl select-none overflow-y-auto"
      style={{ animation: "fadeIn 0.25s ease-out" }}
    >
      {/* Ambient Dashain & Tihar Festival Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(245, 158, 11, 0.22) 0%, rgba(124, 58, 237, 0.12) 50%, transparent 80%)",
        }}
      />

      {/* Main Modal Card Container */}
      <div
        className={`relative w-full ${hasWonCash ? "max-w-[920px]" : "max-w-[560px]"} my-auto overflow-hidden`}
        style={{ animation: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Outer 3D Golden-Crimson Nepalese Festival Border */}
        <div
          className="absolute inset-0 rounded-[38px] p-[3px] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(135deg, #fde68a, #f59e0b, #ea580c, #dc2626, #fbbf24, #f59e0b)",
          }}
        />

        {/* Card Body */}
        <div className="relative z-10 m-[3px] rounded-[36px] overflow-hidden bg-gradient-to-b from-[#1c122e] via-[#140b24] to-[#0c0617] text-white p-5 sm:p-8 shadow-2xl border border-amber-500/30 flex flex-col">
          {/* Top Tihar Wire Lights Garland */}
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none overflow-hidden opacity-95 flex justify-around items-center px-6">
            <span className="w-3 h-4 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
            <span className="w-3 h-4 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" style={{ animationDelay: "0.3s" }} />
            <span className="w-3 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" style={{ animationDelay: "0.6s" }} />
            <span className="w-3 h-4 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] animate-pulse" style={{ animationDelay: "0.9s" }} />
            <span className="w-3 h-4 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899] animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="w-3 h-4 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047] animate-pulse" style={{ animationDelay: "0.7s" }} />
            <span className="w-3 h-4 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7] animate-pulse" style={{ animationDelay: "0.2s" }} />
          </div>

          {/* Floating Dashain Diamond Kite 1 (Top Left) */}
          <div className="absolute -top-4 -left-4 pointer-events-none opacity-90 rotate-[-15deg] hidden sm:block">
            <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rotate-45 border-2 border-white/70 shadow-xl" />
            <svg className="w-6 h-10 -mt-1 ml-5" viewBox="0 0 24 40">
              <path d="M4,0 Q14,12 6,24 T9,40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Floating Dashain Diamond Kite 2 (Top Right) */}
          <div className="absolute -top-4 -right-4 pointer-events-none opacity-90 rotate-[15deg] hidden sm:block">
            <div className="relative w-12 h-12 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 rotate-45 border-2 border-white/70 shadow-xl" />
            <svg className="w-6 h-10 -mt-1 ml-5" viewBox="0 0 24 40">
              <path d="M4,0 Q14,12 6,24 T9,40" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all z-30 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ── HEADER: FESTIVE BANNER & CUSTOMER RECOGNITION ── */}
          <div className="text-center pt-3 pb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/30 to-red-600/30 border border-amber-400/50 text-amber-300 font-black text-xs uppercase tracking-widest shadow-lg mb-2">
              <span>🪔</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>
                {hasWonCash
                  ? "दशैं तथा तिहार महा-बम्पर उपहार योजना २०८१/८२"
                  : "दशैं तथा तिहार बम्पर उपहार योजना २०८१/८२"}
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>🪔</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 drop-shadow-md">
              हार्दिक बधाई, {customerName} ज्यू!
            </h1>

            {customerPhone && (
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-amber-200/80 mt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>सम्पर्क नं: {customerPhone}</span>
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-200 font-semibold mt-1">
              {hasWonCash ? (
                <>
                  तपाईंले पाङ्ग्रा र क्यास पत्ती दुवैमा गरी{" "}
                  <strong className="text-amber-300 font-black">
                    २ वटै बम्पर उपहार
                  </strong>{" "}
                  जित्न सफल हुनुभएको छ!
                </>
              ) : (
                <>
                  तपाईंले पाङ्ग्रामा{" "}
                  <strong className="text-amber-300 font-black">
                    बम्पर उपहार
                  </strong>{" "}
                  जित्न सफल हुनुभएको छ!
                </>
              )}
            </p>
          </div>

          {/* ── PRIZES DISPLAY SECTION ── */}
          {hasWonCash ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-2">
              {/* Product 1: Wheel Win */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border-2 border-amber-400/60 p-4 sm:p-5 flex flex-col items-center text-center shadow-xl overflow-hidden group hover:border-amber-300 transition-all">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white font-black text-[11px] uppercase tracking-wide shadow-md">
                    🎡 पहिलो उपहार • Wheel
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-48 flex items-center justify-center mt-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent rounded-2xl" />
                  {prize1?.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={prize1.img}
                      alt={prize1.name || "Wheel Prize"}
                      className="relative z-10 max-h-40 sm:max-h-44 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                      style={{ animation: "floatPrize 3s ease-in-out infinite" }}
                    />
                  ) : (
                    <div className="text-7xl z-10" style={{ animation: "floatPrize 3s ease-in-out infinite" }}>
                      🎁
                    </div>
                  )}
                </div>

                <div className="w-full mt-2 flex flex-col gap-1">
                  {prize1?.brand && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full mx-auto">
                      {prize1.brand}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {prize1?.name || "Spin Wheel Product"}
                  </h3>
                  {prize1?.nepaliName && (
                    <p className="text-xs font-bold text-amber-200">
                      {prize1.nepaliName}
                    </p>
                  )}
                </div>
              </div>

              {/* Product 2: CashPatti Showdown Win */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border-2 border-purple-400/60 p-4 sm:p-5 flex flex-col items-center text-center shadow-xl overflow-hidden group hover:border-purple-300 transition-all">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-black text-[11px] uppercase tracking-wide shadow-md">
                    🃏 दोस्रो उपहार • CashPatti
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-48 flex flex-col items-center justify-center mt-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl" />
                  <div
                    className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ animation: "floatPrize 3.4s ease-in-out infinite" }}
                  >
                    {renderCashRewardImage()}
                  </div>
                </div>

                <div className="w-full mt-2 flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 bg-purple-400/15 px-2.5 py-0.5 rounded-full mx-auto">
                    {prize2?.rankLabel || "Winner Finish"}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {prize2?.prizeLabel || "Rs. Cash Reward"}
                  </h3>
                  <p className="text-xs font-bold text-purple-200">
                    {prize2?.cardPlayerName ? `खिलाडी: ${prize2.cardPlayerName}` : "Teen Patti Showdown Reward"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Show ONLY Won Product if CashPatti resulted in Better Luck Next Time */
            <div className="w-full max-w-[440px] mx-auto my-3">
              <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border-2 border-amber-400/60 p-5 flex flex-col items-center text-center shadow-xl overflow-hidden group hover:border-amber-300 transition-all">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wide shadow-md">
                    🎡 तपाईंको उपहार • Winner
                  </span>
                </div>

                <div className="relative w-full h-48 sm:h-52 flex items-center justify-center mt-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent rounded-2xl" />
                  {prize1?.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={prize1.img}
                      alt={prize1.name || "Wheel Prize"}
                      className="relative z-10 max-h-44 sm:max-h-48 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                      style={{ animation: "floatPrize 3s ease-in-out infinite" }}
                    />
                  ) : (
                    <div className="text-8xl z-10" style={{ animation: "floatPrize 3s ease-in-out infinite" }}>
                      🎁
                    </div>
                  )}
                </div>

                <div className="w-full mt-3 flex flex-col gap-1">
                  {prize1?.brand && (
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/15 px-3 py-0.5 rounded-full mx-auto">
                      {prize1.brand}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {prize1?.name || "Spin Wheel Product"}
                  </h3>
                  {prize1?.nepaliName && (
                    <p className="text-sm font-bold text-amber-200 mt-0.5">
                      {prize1.nepaliName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── COMBINED WINNER CELEBRATION SUMMARY ── */}
          <div className="mt-2 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg">
                <Trophy className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-300">
                  दशैं तथा तिहार उपहार दाबी (Claim at Store)
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-semibold flex items-center gap-1.5 flex-wrap">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>AlamTech: New Road &amp; Putalisadak, Kathmandu</span>
                  <span className="text-amber-300 font-bold">• 985-1193787</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-black text-emerald-300">
                {hasWonCash
                  ? "दुवै उपहार सुरक्षित गरियो (Both Prizes Recorded)"
                  : "उपहार सुरक्षित गरियो (Prize Recorded)"}
              </span>
            </div>
          </div>

          {/* ── ACTION BUTTONS ── */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Claim / Save Voucher Button */}
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base text-white tracking-wide shadow-xl transition-all active:scale-95 cursor-pointer relative overflow-hidden group bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 border border-white/20 flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5 text-amber-200" />
              <span>उपहार सुरक्षित गर्नुहोस् (Done &amp; Save)</span>
            </button>

            {/* Spin Again for New Customer */}
            <button
              onClick={onResetSession}
              className="flex-1 py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base text-white tracking-wide shadow-xl transition-all active:scale-95 cursor-pointer relative overflow-hidden group bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 border border-white/30 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5 text-amber-200 group-hover:-rotate-90 transition-transform duration-300" />
              <span>अर्को नयाँ ग्राहकको खेल (New Customer Spin)</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8) translateY(24px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes floatPrize {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
      `}</style>
    </div>
  );
}
