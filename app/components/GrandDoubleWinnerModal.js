"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  Sparkles,
  Gift,
  Phone,
  MapPin,
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
        playGrandDoubleWinFanfare(false);

        confetti({
          particleCount: 260,
          spread: 110,
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
          scalar: 1.3,
        });

        const t1 = setTimeout(() => {
          confetti({
            particleCount: 130,
            angle: 55,
            spread: 75,
            origin: { x: 0.02, y: 0.65 },
            colors: ["#f59e0b", "#ef4444", "#fef08a"],
          });
          confetti({
            particleCount: 130,
            angle: 125,
            spread: 75,
            origin: { x: 0.98, y: 0.65 },
            colors: ["#7c3aed", "#10b981", "#fef08a"],
          });
        }, 350);

        const t2 = setTimeout(() => {
          confetti({
            particleCount: 90,
            spread: 145,
            origin: { y: 0.25 },
            shapes: ["circle"],
            colors: ["#fbbf24", "#f59e0b", "#ea580c"],
            scalar: 1.1,
          });
        }, 800);

        const t3 = setTimeout(() => {
          confetti({
            particleCount: 110,
            angle: 90,
            spread: 125,
            origin: { y: 0.8 },
            colors: ["#38bdf8", "#ec4899", "#f59e0b", "#fff"],
          });
        }, 1300);

        const t4 = setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { x: 0.15, y: 0.4 },
            colors: ["#a855f7", "#fde047", "#fff"],
          });
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { x: 0.85, y: 0.4 },
            colors: ["#22c55e", "#f59e0b", "#fff"],
          });
        }, 1800);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
          clearTimeout(t4);
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
  const prize3 = sessionData.prize3 || null;

  // Determine how many cash prizes were won (prize2 from cashpatti)
  const hasCash = Boolean(prize2?.won && prize2?.prizeValue > 0);

  // Count total prizes shown (prize1 always shown, prize2 if cash won, prize3 always shown)
  const colCount = hasCash ? 3 : 2; // 3 cols if cashpatti won, 2 cols if only prize1 + prize3

  // Render authentic currency note image for cashpatti cash prize
  const renderCashRewardImage = () => {
    const val = prize2?.prizeValue ?? 200;

    if (val === 200) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/100nepalirupees.jpg"
            alt="100 Nepali Rupees Note"
            className="absolute max-h-24 sm:max-h-28 w-auto object-contain rounded-xl shadow-xl -rotate-6 -translate-x-5 -translate-y-2 opacity-95 border-2 border-amber-300/40"
          />
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

  // Individual prize card component for the grid
  const PrizeCard = ({ label, badgeClass, prize, imageSlot, borderColor, slot }) => (
    <div
      className={`relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border-2 ${borderColor} p-3 sm:p-4 flex flex-col items-center text-center shadow-xl overflow-hidden group hover:brightness-110 transition-all`}
    >
      <div className="absolute top-2 left-2 z-20">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-black text-[10px] uppercase tracking-wide shadow-md ${badgeClass}`}>
          {label}
        </span>
      </div>

      <div className="relative w-full h-36 sm:h-40 flex items-center justify-center mt-5">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl" />
        {imageSlot}
      </div>

      <div className="w-full mt-2 flex flex-col gap-0.5">
        {prize?.brand && (
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full mx-auto">
            {prize.brand}
          </span>
        )}
        {slot === "cash" ? (
          <>
            <span className="text-[9px] font-black uppercase tracking-widest text-purple-300 bg-purple-400/15 px-2 py-0.5 rounded-full mx-auto">
              {prize2?.rankLabel || "Winner Finish"}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {prize2?.prizeLabel || "Cash Reward"}
            </h3>
            <p className="text-[10px] font-bold text-purple-200">
              {prize2?.cardPlayerName ? `खिलाडी: ${prize2.cardPlayerName}` : "Teen Patti Reward"}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {prize?.name || "Prize"}
            </h3>
            {prize?.nepaliName && (
              <p className="text-[10px] font-bold text-amber-200">{prize.nepaliName}</p>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/88 backdrop-blur-xl select-none overflow-y-auto"
      style={{ animation: "fadeIn 0.25s ease-out" }}
    >
      {/* Festival radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, rgba(245, 158, 11, 0.22) 0%, rgba(124, 58, 237, 0.12) 50%, transparent 82%)",
        }}
      />

      {/* Main Modal Container */}
      <div
        className="relative w-full max-w-[980px] my-auto overflow-hidden"
        style={{ animation: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* 3D Festival Border */}
        <div
          className="absolute inset-0 rounded-[38px] p-[3px] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(135deg, #fde68a, #f59e0b, #ea580c, #dc2626, #fbbf24, #f59e0b)",
          }}
        />

        {/* Card Body */}
        <div className="relative z-10 m-[3px] rounded-[36px] overflow-hidden bg-gradient-to-b from-[#1c122e] via-[#140b24] to-[#0c0617] text-white px-4 sm:px-6 py-5 sm:py-8 shadow-2xl border border-amber-500/30 flex flex-col">

          {/* Tihar Wire Lights */}
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none overflow-hidden opacity-95 flex justify-around items-center px-4">
            {[
              ["bg-red-500","#ef4444","0s"],
              ["bg-amber-400","#f59e0b","0.3s"],
              ["bg-emerald-400","#10b981","0.6s"],
              ["bg-sky-400","#38bdf8","0.9s"],
              ["bg-pink-500","#ec4899","0.4s"],
              ["bg-yellow-300","#fde047","0.7s"],
              ["bg-purple-400","#a855f7","0.2s"],
              ["bg-red-400","#ef4444","1.1s"],
              ["bg-amber-300","#f59e0b","0.5s"],
            ].map(([cls, glow, delay], i) => (
              <span
                key={i}
                className={`w-3 h-4 rounded-full ${cls} animate-pulse`}
                style={{ boxShadow: `0 0 10px ${glow}`, animationDelay: delay }}
              />
            ))}
          </div>

          {/* Floating Kite decorations */}
          <div className="absolute -top-4 -left-4 pointer-events-none opacity-90 rotate-[-15deg] hidden sm:block">
            <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rotate-45 border-2 border-white/70 shadow-xl" />
            <svg className="w-6 h-10 -mt-1 ml-5" viewBox="0 0 24 40">
              <path d="M4,0 Q14,12 6,24 T9,40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>
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

          {/* ── HEADER ── */}
          <div className="text-center pt-4 pb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/30 to-red-600/30 border border-amber-400/50 text-amber-300 font-black text-xs uppercase tracking-widest shadow-lg mb-2">
              <span>🪔</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>दशैं तथा तिहार महा-बम्पर उपहार योजना २०८१/८२</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>🪔</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 drop-shadow-md">
              हार्दिक बधाई, {customerName} ज्यू!
            </h1>

            {customerPhone && (
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-amber-200/80 mt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>सम्पर्क नं: {customerPhone}</span>
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-200 font-semibold mt-1">
              तपाईंले{" "}
              <strong className="text-amber-300 font-black">
                {colCount === 3 ? "३ वटै खेलमा" : "खेलहरूमा"}
              </strong>{" "}
              भव्य उपहारहरू जित्न सफल हुनुभएको छ! 🎊
            </p>
          </div>

          {/* ── PRIZES GRID ── */}
          <div className={`grid gap-3 sm:gap-4 my-2 ${colCount === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 max-w-[640px] mx-auto w-full"}`}>

            {/* Prize 1: Spin Wheel 1 */}
            <PrizeCard
              label="🎡 पहिलो उपहार"
              badgeClass="bg-red-600"
              prize={prize1}
              borderColor="border-amber-400/60"
              slot="product"
              imageSlot={
                prize1?.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={prize1.img}
                    alt={prize1.name || "Wheel Prize 1"}
                    className="relative z-10 max-h-32 sm:max-h-36 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{ animation: "floatPrize 3s ease-in-out infinite" }}
                  />
                ) : (
                  <div className="text-6xl z-10" style={{ animation: "floatPrize 3s ease-in-out infinite" }}>🎁</div>
                )
              }
            />

            {/* Prize 2: CashPatti (only if won) */}
            {hasCash && (
              <PrizeCard
                label="🃏 दोस्रो उपहार"
                badgeClass="bg-gradient-to-r from-purple-700 to-indigo-600"
                prize={null}
                borderColor="border-purple-400/60"
                slot="cash"
                imageSlot={
                  <div
                    className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ animation: "floatPrize 3.4s ease-in-out infinite" }}
                  >
                    {renderCashRewardImage()}
                  </div>
                }
              />
            )}

            {/* Prize 3: Spin Wheel 2 */}
            <PrizeCard
              label="🎡 तेस्रो उपहार"
              badgeClass="bg-gradient-to-r from-emerald-700 to-teal-600"
              prize={prize3}
              borderColor="border-emerald-400/60"
              slot="product"
              imageSlot={
                prize3?.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={prize3.img}
                    alt={prize3.name || "Wheel Prize 3"}
                    className="relative z-10 max-h-32 sm:max-h-36 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{ animation: "floatPrize 3.8s ease-in-out infinite" }}
                  />
                ) : (
                  <div className="text-6xl z-10" style={{ animation: "floatPrize 3.8s ease-in-out infinite" }}>🎁</div>
                )
              }
            />
          </div>

          {/* ── STORE INFO STRIP ── */}
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
                सबै उपहारहरू सुरक्षित गरियो (All Prizes Recorded)
              </span>
            </div>
          </div>

          {/* ── ACTION BUTTONS ── */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base text-white tracking-wide shadow-xl transition-all active:scale-95 cursor-pointer relative overflow-hidden group bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 border border-white/20 flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5 text-amber-200" />
              <span>उपहार सुरक्षित गर्नुहोस् (Done &amp; Save)</span>
            </button>

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
