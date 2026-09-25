"use client";

import React from "react";
import LingePing from "./LingePing";
import NepaliCashNote from "./NepaliCashNote";

export default function FestiveBanner() {
  return (
    <div className="relative select-none flex flex-col items-center justify-center text-center w-full max-w-[420px]">
      {/* ============================================================== */}
      {/* 🎪 TRADITIONAL NEPALI LINGE PING (HERO BACKGROUND BACKDROP) */}
      {/* Standing directly behind the hero banner with animated swinger! */}
      {/* ============================================================== */}
      <div className="absolute -top-16 -bottom-6 left-0 right-0 -z-10 flex items-center justify-center pointer-events-none overflow-visible">
        {/* Golden Sun Radiance Aura */}
        <div className="absolute top-[15%] w-72 h-72 rounded-full bg-gradient-to-tr from-amber-300/35 via-yellow-100/50 to-transparent blur-2xl pointer-events-none" />

        {/* Linge Ping Bamboo Swing Silhouette with Swaying Pendulum Animation */}
        <div className="w-[360px] sm:w-[410px] h-[400px] sm:h-[450px] opacity-65 drop-shadow-md">
          <LingePing animated={true} className="w-full h-full" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🪁 FLOATING SKY BLUE & YELLOW BOXES (DIAMOND KITES PARTICLES) */}
      {/* ============================================================== */}
      {/* 1. Yellow Diamond Box (Top Right) */}
      <div className="absolute -top-6 -right-2 w-10 h-10 rotate-12 animate-float-slow hidden sm:block z-20">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-500 rotate-45 border-2 border-white shadow-lg relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/70 -translate-y-1/2" />
        </div>
      </div>

      {/* 2. Sky Blue Diamond Box (Bottom Left) */}
      <div
        className="absolute -bottom-4 -left-4 w-9 h-9 -rotate-12 animate-float-slow hidden sm:block z-20"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="w-7 h-7 bg-gradient-to-br from-sky-400 to-blue-600 rotate-45 border-2 border-white shadow-md" />
      </div>

      {/* 3. Sunshine Yellow Diamond Box (Mid-Left) */}
      <div
        className="absolute top-14 -left-5 w-8 h-8 rotate-6 animate-float-slow hidden md:block z-20"
        style={{ animationDelay: "2.8s" }}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-amber-500 rotate-45 border-1.5 border-white shadow-sm" />
      </div>

      {/* 4. Cyan / Sky Blue Diamond Box (Top-Left) */}
      <div
        className="absolute -top-4 -left-2 w-8 h-8 -rotate-6 animate-float-slow hidden sm:block z-20"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-sky-600 rotate-45 border-1.5 border-white shadow-sm" />
      </div>

      {/* 5. Mini Amber Diamond Box (Mid-Right) */}
      <div
        className="absolute top-28 -right-4 w-7 h-7 rotate-45 animate-float-slow hidden md:block z-20"
        style={{ animationDelay: "3.5s" }}
      >
        <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-yellow-400 rotate-45 border-1.5 border-white shadow-sm" />
      </div>

      {/* ============================================================== */}
      {/* 💸 FLOATING NEPALI RS. 1000 CASH NOTES (दशैं दक्षिणा नयाँ नोट) */}
      {/* ============================================================== */}
      {/* Cash Note 1: Floating on upper-left near brand title (Back side - Twin Elephants) */}
      <div
        className="absolute -top-2 -left-6 sm:-left-10 animate-cash-drift z-30 hidden sm:block"
        style={{ "--cash-rot": "-14deg", animationDelay: "0.4s" }}
      >
        <NepaliCashNote side="back" width={80} height={38} />
      </div>

      {/* Cash Note 2: Floating near 'दक्षिणा उपहार' on right (Front side - Mount Everest) */}
      <div
        className="absolute top-28 -right-6 sm:-right-10 animate-cash-drift z-30 hidden sm:block"
        style={{ "--cash-rot": "16deg", animationDelay: "2.1s" }}
      >
        <NepaliCashNote side="front" width={80} height={38} />
      </div>

      {/* ============================================================== */}
      {/* 🌟 CATCHY FESTIVE HERO STAGE CARD */}
      {/* ============================================================== */}
      <div className="w-full bg-white/75 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-white/90 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12),0_0_30px_rgba(251,191,36,0.2)] relative overflow-hidden z-10 flex flex-col items-center">
        {/* Decorative Mini Tihar Multicolour Wire Lights (झिलिमिली बत्ती माला) */}
        <div className="w-full flex items-center justify-around px-3 mb-1 opacity-95">
          {[
            { c: "#ef4444", a: "animate-tihar-1" },
            { c: "#f59e0b", a: "animate-tihar-2" },
            { c: "#10b981", a: "animate-tihar-1" },
            { c: "#3b82f6", a: "animate-tihar-2" },
            { c: "#ec4899", a: "animate-tihar-1" },
            { c: "#facc15", a: "animate-tihar-2" },
            { c: "#8b5cf6", a: "animate-tihar-1" },
            { c: "#06b6d4", a: "animate-tihar-2" },
            { c: "#ef4444", a: "animate-tihar-1" },
          ].map((bulb, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1 h-1 bg-slate-800 rounded-t-xs" />
              <div
                className={`w-2.5 h-3.5 rounded-full border border-white/60 ${bulb.a}`}
                style={{
                  backgroundColor: bulb.c,
                  boxShadow: `0 0 8px ${bulb.c}`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Decorative Festive Marigold Flower Garland (सयपत्री फूलको तोरण) */}
        <div className="flex items-center justify-center gap-1.5 mb-1.5 opacity-90">
          {["🌼", "🌸", "🌼", "🌸", "🌼", "🌸", "🌼"].map((flower, idx) => (
            <span key={idx} className="text-xs sm:text-sm drop-shadow-sm select-none">
              {flower}
            </span>
          ))}
        </div>

        {/* Alam Tech Official Store Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-full shadow-md shadow-blue-600/25 mb-1.5 border border-white/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-black tracking-wider uppercase">
            alamtech.com.np
          </span>
          <span className="text-[10px] text-blue-200 font-bold">• New Road & Putalisadak</span>
        </div>

        {/* Main 3D Brand & Festive Typography */}
        <div className="relative inline-block my-0.5">
          {/* Festive Jamara Sprout & Tika on top of Alam Tech */}
          <div className="absolute -top-7 right-4 sm:right-8 z-20 flex items-center justify-center">
            <svg className="w-10 h-10 drop-shadow-md" viewBox="0 0 40 40">
              <path d="M 20 28 Q 12 14 10 4 Q 16 16 20 28" fill="#16a34a" />
              <path d="M 20 28 Q 20 10 21 2 Q 23 14 20 28" fill="#22c55e" />
              <path d="M 20 28 Q 28 14 30 4 Q 24 16 20 28" fill="#4ade80" />
              <circle cx="20" cy="30" r="5" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
              <circle cx="18" cy="28" r="1.2" fill="#ffffff" />
              <circle cx="22" cy="29" r="1.2" fill="#ffffff" />
            </svg>
          </div>

          {/* Brand Name: आलम टेक (Alam Tech) in 3D Red Typography */}
          <h1
            className="text-4xl sm:text-5xl xl:text-[54px] font-black tracking-tight leading-none text-red-600"
            style={{
              textShadow: `
                3px 3px 0 #ffffff,
                -3px -3px 0 #ffffff,
                3px -3px 0 #ffffff,
                -3px 3px 0 #ffffff,
                5px 5px 0 #991b1b,
                6px 6px 0 #7f1d1d,
                8px 8px 14px rgba(0,0,0,0.25)
              `,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            आलम टेक
          </h1>

          {/* Event Sub-Title: दक्षिणा उपहार (Festive Gift Draw) in 3D Green Typography */}
          <h2
            className="text-3xl sm:text-4xl xl:text-[46px] font-black tracking-tight leading-none text-emerald-500 mt-1"
            style={{
              textShadow: `
                3px 3px 0 #fef08a,
                -3px -3px 0 #fef08a,
                3px -3px 0 #fef08a,
                -3px 3px 0 #fef08a,
                5px 5px 0 #047857,
                6px 6px 0 #064e3b,
                8px 8px 14px rgba(0,0,0,0.25)
              `,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            दक्षिणा उपहार
          </h2>
        </div>

        {/* Date Banner with Pennants */}
        <div className="relative mt-2">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white font-extrabold text-[11px] sm:text-xs rounded-full shadow-md tracking-wider border border-white/60">
            दसैं-तिहार महा-बचत योजना | असोज १ - ३१
          </div>

          {/* Colorful mini festive bunting */}
          <div className="flex justify-center gap-1 mt-1">
            {["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"].map((c, i) => (
              <div
                key={i}
                className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px]"
                style={{ borderTopColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Store Speciality Tagline */}
        <p className="text-[11px] font-bold text-slate-600 mt-1">
          Trusted Laptop Store in Kathmandu & Custom PC Expert
        </p>

        {/* Genuine Tech Gadget Accents: Angled Gaming Laptop & Mouse */}
        <div className="relative w-full max-w-[200px] h-14 mt-1 flex items-center justify-center">
          <div className="w-28 h-6 bg-slate-400/20 rounded-[100%] blur-[4px] absolute bottom-1" />
          <img
            src="/products/laptop.svg"
            alt="Gaming Laptop"
            width="90"
            height="58"
            className="w-22 h-14 object-contain drop-shadow-md -rotate-6 z-10"
          />
          <img
            src="/products/mouse.svg"
            alt="Gaming Mouse"
            width="36"
            height="44"
            className="w-9 h-11 object-contain drop-shadow-md rotate-12 -ml-2.5 z-10"
          />
        </div>
      </div>
    </div>
  );
}
