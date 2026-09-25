"use client";

import React from "react";
import LingePing from "./LingePing";
import NepaliCashNote from "./NepaliCashNote";
import TiharLights from "./TiharLights";

export default function SceneryBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Clear Autumn Dashain Sky Gradient (शरद ऋतुको घमाईलो आकाश) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-amber-50/50" />

      {/* Multicolour Tihar Wire Lights (झिलिमिली बत्तीको तोरण) across the Autumn Sky */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <TiharLights />
      </div>

      {/* Warm Golden Dashain Sun in the Autumn Sky */}
      <div className="absolute top-[8%] left-[45%] w-28 h-28 rounded-full bg-gradient-to-br from-amber-200/80 via-yellow-100/50 to-transparent blur-xl pointer-events-none" />
      <div className="absolute top-[10%] left-[47%] w-14 h-14 rounded-full bg-amber-100/70 blur-sm pointer-events-none" />

      {/* Fluffy White Autumn Clouds (शरद ऋतुको सेतो बादल) */}
      <div className="absolute top-[12%] left-[8%] w-48 h-12 bg-white/70 rounded-full blur-md animate-bird-glide opacity-60" />
      <div className="absolute top-[18%] right-[15%] w-64 h-14 bg-white/60 rounded-full blur-lg animate-bird-glide opacity-50" style={{ animationDelay: "3s" }} />

      {/* Distant Snowy Mountain Silhouettes (Layer 1 - Deep Himalayas) */}
      <svg
        className="absolute bottom-[24%] w-full h-[40%] opacity-35 object-cover"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#93c5fd"
          d="M0,224L120,192L240,240L360,150L480,210L600,110L720,200L840,95L960,180L1080,120L1200,210L1320,150L1440,240L1440,320L0,320Z"
        />
        {/* Snow Peaks Highlights */}
        <polygon points="600,110 565,160 635,160" fill="#ffffff" opacity="0.9" />
        <polygon points="840,95 800,150 880,150" fill="#ffffff" opacity="0.95" />
        <polygon points="360,150 330,190 390,190" fill="#ffffff" opacity="0.85" />
        <polygon points="1080,120 1045,165 1115,165" fill="#ffffff" opacity="0.9" />
      </svg>

      {/* Snowy Mountain Silhouettes (Layer 2 - Closer Mountain Peaks) */}
      <svg
        className="absolute bottom-[16%] w-full h-[32%] opacity-55 object-cover"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
      >
        <path
          fill="#bfdbfe"
          d="M0,160L160,85L320,170L480,100L640,190L800,75L960,170L1120,90L1280,180L1440,115L1440,280L0,280Z"
        />
        <polygon points="160,85 115,135 205,135" fill="#ffffff" opacity="0.95" />
        <polygon points="800,75 745,130 855,130" fill="#ffffff" opacity="0.95" />
        <polygon points="1120,90 1075,135 1165,135" fill="#ffffff" opacity="0.95" />
      </svg>

      {/* Rolling Lush Green Hills of Nepal (काठमाडौंका हरिया डाँडाहरू) */}
      <svg
        className="absolute bottom-0 w-full h-[25%] opacity-85 object-cover"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        {/* Rear Hill */}
        <path
          fill="#4ade80"
          opacity="0.65"
          d="M0,130 Q300,50 650,110 T1440,90 L1440,220 L0,220 Z"
        />
        {/* Front Hill */}
        <path
          fill="#22c55e"
          opacity="0.8"
          d="M0,160 Q450,90 920,150 T1440,120 L1440,220 L0,220 Z"
        />
        {/* Right Foreground Hill (Hilltop where Linge Ping stands!) */}
        <path
          fill="#16a34a"
          opacity="0.9"
          d="M750,220 Q1050,110 1440,140 L1440,220 Z"
        />
      </svg>

      {/* ============================================================== */}
      {/* 🎪 TRADITIONAL NEPALI LINGE PING (बाँसको लिङ्गे पिङ) */}
      {/* Prominently standing on the hilltop behind the Main Hero area! */}
      {/* ============================================================== */}
      <div className="absolute bottom-[2%] right-[2%] sm:right-[5%] md:right-[7%] lg:right-[9%] w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px] h-[360px] sm:h-[420px] lg:h-[480px] pointer-events-none z-0 opacity-90 drop-shadow-md">
        <LingePing animated={true} className="w-full h-full" />
      </div>

      {/* ============================================================== */}
      {/* 💸 NEPALI RS. 1000 CASH NOTES PARTICLES (दशैं दक्षिणा) */}
      {/* 5 Notes total: 3 Back-facing (Twin Elephants) & 2 Front-facing (Mount Everest) */}
      {/* ============================================================== */}
      {/* Note 1: Drifting high in the sky over the mountains (Back side - Twin Elephants) */}
      <div
        className="absolute top-[16%] left-[34%] animate-cash-drift opacity-90 hidden sm:block"
        style={{ "--cash-rot": "-14deg", animationDelay: "0.2s" }}
      >
        <NepaliCashNote side="back" width={92} height={44} />
      </div>

      {/* Note 2: Floating near the right hero area (Front side - Mount Everest) */}
      <div
        className="absolute top-[28%] right-[28%] animate-cash-drift opacity-85 hidden md:block"
        style={{ "--cash-rot": "16deg", animationDelay: "1.8s" }}
      >
        <NepaliCashNote side="front" width={80} height={38} />
      </div>

      {/* Note 3: Floating near the top-left (Back side - Twin Elephants) */}
      <div
        className="absolute top-[22%] left-[12%] animate-cash-drift opacity-80 hidden lg:block"
        style={{ "--cash-rot": "8deg", animationDelay: "3.2s" }}
      >
        <NepaliCashNote side="back" width={76} height={36} />
      </div>

      {/* Note 4: Gently gliding near bottom-center (Back side - Twin Elephants) */}
      <div
        className="absolute bottom-[28%] left-[44%] animate-cash-drift opacity-85 hidden sm:block"
        style={{ "--cash-rot": "-10deg", animationDelay: "2.4s" }}
      >
        <NepaliCashNote side="back" width={86} height={41} />
      </div>

      {/* Note 5: Drifting on far right near the Linge Ping (Front side - Mount Everest) */}
      <div
        className="absolute top-[12%] right-[6%] animate-cash-drift opacity-80 hidden sm:block"
        style={{ "--cash-rot": "-6deg", animationDelay: "4.1s" }}
      >
        <NepaliCashNote side="front" width={74} height={35} />
      </div>

      {/* ============================================================== */}
      {/* 🪁 ABUNDANT SKY BLUE & YELLOW BOXES (DIAMOND KITES PARTICLES) */}
      {/* ============================================================== */}

      {/* Particle 1: Golden Yellow Diamond Kite with Ribbon Tail (Left Sky) */}
      <div className="absolute top-[12%] left-[22%] animate-float-slow opacity-90 hidden sm:block">
        <div className="relative w-11 h-11 bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 rotate-45 border-2 border-white shadow-lg">
          <div className="absolute inset-0 border-t border-l border-amber-200" />
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/70 -translate-y-1/2" />
        </div>
        {/* Tassels */}
        <svg className="w-8 h-14 -mt-1 ml-4" viewBox="0 0 30 50">
          <path d="M5,0 Q18,15 8,30 T12,50" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="7,25 2,32 12,32" fill="#ef4444" />
          <polygon points="12,45 6,52 16,52" fill="#3b82f6" />
        </svg>
      </div>

      {/* Particle 2: Sky Blue Diamond Kite (Center Sky) */}
      <div
        className="absolute top-[8%] left-[48%] animate-float-slow opacity-85 hidden md:block"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="relative w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rotate-45 border-2 border-white shadow-md">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/80 -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/80 -translate-x-1/2" />
        </div>
        <svg className="w-6 h-10 -mt-1 ml-3" viewBox="0 0 25 40">
          <path d="M5,0 Q15,12 6,24 T10,40" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />
          <polygon points="6,22 2,28 10,28" fill="#f59e0b" />
        </svg>
      </div>

      {/* Particle 3: Golden Sunshine Diamond (Upper Right Sky) */}
      <div
        className="absolute top-[16%] right-[19%] animate-float-slow opacity-90 hidden sm:block"
        style={{ animationDelay: "2.5s" }}
      >
        <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 rotate-45 border-2 border-white shadow-md">
          <div className="absolute inset-1 border border-white/40" />
        </div>
        <svg className="w-7 h-12 -mt-1 ml-3.5" viewBox="0 0 25 45">
          <path d="M5,0 Q16,14 7,28 T11,45" fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="2 2" />
          <polygon points="7,24 2,30 11,30" fill="#ef4444" />
        </svg>
      </div>

      {/* Particle 4: Sky Blue Diamond Box (Right Hero Background) */}
      <div
        className="absolute top-[32%] right-[11%] animate-float-slow opacity-85 hidden sm:block"
        style={{ animationDelay: "3.5s" }}
      >
        <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-400 to-sky-600 rotate-45 border-2 border-white shadow-md">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/70 -translate-y-1/2" />
        </div>
      </div>

      {/* Particle 5: Mini Yellow Diamond Box (Mid-Sky Left) */}
      <div
        className="absolute top-[28%] left-[18%] animate-float-slow opacity-80 hidden lg:block"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rotate-45 border-1.5 border-white shadow-sm" />
      </div>

      {/* Particle 6: Mini Sky Blue Diamond Box (Far Left) */}
      <div
        className="absolute top-[38%] left-[7%] animate-float-slow opacity-75 hidden sm:block"
        style={{ animationDelay: "4.2s" }}
      >
        <div className="w-7 h-7 bg-gradient-to-br from-sky-400 to-blue-500 rotate-45 border-1.5 border-white shadow-sm" />
      </div>

      {/* Particle 7: Bright Amber Diamond Box (Upper Left Wheel area) */}
      <div
        className="absolute top-[7%] left-[6%] animate-float-slow opacity-85 hidden md:block"
        style={{ animationDelay: "2.1s" }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rotate-45 border-2 border-white shadow-md" />
      </div>

      {/* Particle 8: Turquoise/Sky Box (Bottom Left Scenery) */}
      <div
        className="absolute bottom-[24%] left-[16%] animate-float-slow opacity-80 hidden sm:block"
        style={{ animationDelay: "3.1s" }}
      >
        <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rotate-45 border-1.5 border-white shadow-sm" />
      </div>

      {/* Festive Bunting / Pennant Garlands across the very top */}
      <div className="absolute top-0 left-0 right-0 flex justify-between overflow-hidden opacity-90">
        {Array.from({ length: 24 }).map((_, i) => {
          const colors = [
            "border-t-rose-500",
            "border-t-amber-400",
            "border-t-emerald-500",
            "border-t-blue-500",
            "border-t-purple-500",
            "border-t-orange-500",
          ];
          const color = colors[i % colors.length];
          return (
            <div key={i} className="flex-1 flex justify-center">
              <div
                className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${color} drop-shadow-sm`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
