"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getCustomerSession, saveCustomerSession } from "../utils/session";
import { BUMPER_PRIZES } from "../data/prizes";
import { Trophy, Play, Users } from "lucide-react";
import { playTickSound, playWhooshSound, playWinFanfare, playYayyy } from "../utils/audio";

const BETTER_LUCK = {
  id: "better-luck",
  name: "Better Luck",
  fullName: "Better Luck Next Time",
  nepaliName: "अर्को पटक प्रयास गर्नुहोस",
  img: null,
  cabinColor: "#475569",
  value: "None",
};

// 7 Prizes + 5 Better Luck = 12 Sections
// Distributing them evenly:
const SECTIONS = [
  BUMPER_PRIZES[0], // Khasi
  BETTER_LUCK,
  BUMPER_PRIZES[1], // TV
  BUMPER_PRIZES[2], // Monitor
  BETTER_LUCK,
  BUMPER_PRIZES[3], // Cooler
  BETTER_LUCK,
  BUMPER_PRIZES[4], // Macbook
  BUMPER_PRIZES[5], // Smartwatch
  BETTER_LUCK,
  BUMPER_PRIZES[6], // Camera
  BETTER_LUCK,
];

// Provide some distinct bright colors for the slices like in the image
const SLICE_COLORS = [
  "#ef4444", "#3b82f6", "#10b981", "#f59e0b", 
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
  "#6366f1", "#84cc16", "#06b6d4", "#f43f5e"
];

export default function BumperWheelPage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [spinCount, setSpinCount] = useState(0);
  const [wonPrizeIds, setWonPrizeIds] = useState([]);
  
  const wheelRef = useRef(null);
  
  useEffect(() => {
    const sess = getCustomerSession();
    if (sess?.name) {
      setCustomerName(sess.name);
    }
    
    // Load spin count
    const count = parseInt(localStorage.getItem('bumper_spin_count') || '0');
    setSpinCount(count);

    // Load won prizes
    const won = JSON.parse(localStorage.getItem('bumper_won_prizes') || '[]');
    setWonPrizeIds(won);
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowWinner(false);
    playWhooshSound(false);

    // Update spin count
    const newCount = spinCount + 1;
    setSpinCount(newCount);
    localStorage.setItem('bumper_spin_count', newCount.toString());

    // Strategy for predetermined wins
    const wonPrizes = JSON.parse(localStorage.getItem('bumper_won_prizes') || '[]');
    let targetPrizeId = "better-luck";

    // Locked prizes: Khasi, TV, Macbook can never be won.
    // They are physically on the wheel but the logic will never select them.

    // Specific spinner counts
    if (newCount === 25 && !wonPrizes.includes("bumper-cooler")) {
      targetPrizeId = "bumper-cooler";
    } else if (newCount === 50 && !wonPrizes.includes("bumper-smartwatch")) {
      targetPrizeId = "bumper-smartwatch";
    } else if (newCount === 100 && !wonPrizes.includes("bumper-camera")) {
      targetPrizeId = "bumper-camera";
    } else if (newCount === 150 && !wonPrizes.includes("bumper-monitor")) {
      targetPrizeId = "bumper-monitor";
    }

    // Find indices for the chosen prize
    const possibleWinIndices = [];
    SECTIONS.forEach((s, idx) => {
      if (s.id === targetPrizeId) {
        possibleWinIndices.push(idx);
      }
    });

    const targetIndex = possibleWinIndices[Math.floor(Math.random() * possibleWinIndices.length)];
    const sectionAngle = 360 / SECTIONS.length; // 30 degrees
    
    const targetAngle = 360 - (targetIndex * sectionAngle + sectionAngle / 2);
    
    const startRot = rotation;
    const currentRem = startRot % 360;
    let delta = targetAngle - currentRem;
    if (delta <= 0) delta += 360;
    const totalRotation = startRot + 360 * 10 + delta;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
    }

    const durationMs = 18000;
    const startTime = performance.now();
    let lastSpokeIndex = Math.floor(startRot / 30);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const u = Math.min(elapsed / durationMs, 1);

      // A very smooth easing formula without sudden stops.
      // Base ease out makes it start fast and smoothly slow down.
      const p = 1 - Math.pow(1 - u, 3);
      // Wobble adds a smooth back-and-forth motion around the 70-90% mark.
      const wobble = Math.sin(u * Math.PI * 6.5) * 0.1 * Math.pow(1 - u, 1.2);
      let easedProgress = p + wobble;
      if (u === 1) easedProgress = 1; // Ensure it ends exactly at 1

      const currentRot = startRot + (totalRotation - startRot) * easedProgress;
      setRotation(currentRot);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${currentRot}deg)`;
      }

      // Spoke tick sound
      const currentSpokeIndex = Math.floor(currentRot / 30);
      if (currentSpokeIndex !== lastSpokeIndex) {
        playTickSound(false, 0.8);
        lastSpokeIndex = currentSpokeIndex;
      }

      if (u < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        
        // Wait 1.5s after wheel completely stops to show the popup
        setTimeout(() => {
          setWinningPrize(SECTIONS[targetIndex]);
          setShowWinner(true);
          playWinFanfare(false);
          
          setTimeout(() => {
            playYayyy(false);
          }, 500);

          const sess = getCustomerSession() || {};
          saveCustomerSession({ prize3: SECTIONS[targetIndex] });

          if (targetPrizeId !== "better-luck") {
            wonPrizes.push(targetPrizeId);
            localStorage.setItem('bumper_won_prizes', JSON.stringify(wonPrizes));
            setWonPrizeIds([...wonPrizes]);
          }
        }, 1500);
      }
    };

    requestAnimationFrame(animate);
  };

  // Generate conic gradient for 12 sections
  const conicGradientStr = SECTIONS.map((_, i) => {
    const startAngle = i * 30;
    const endAngle = (i + 1) * 30;
    return `${SLICE_COLORS[i]} ${startAngle}deg ${endAngle}deg`;
  }).join(", ");

  return (
    <div className="relative h-screen max-h-screen w-screen bg-white overflow-hidden flex flex-row items-center justify-center p-2 sm:p-4 gap-8 lg:gap-16">
      
      {/* Top Left Spin Counter */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-6 z-40 bg-white/90 border-2 border-slate-200 shadow-md rounded-full px-5 py-2.5 flex items-center gap-2">
        <Users className="w-5 h-5 text-slate-600" />
        <span className="font-black text-slate-800 text-sm tracking-wider">
          Total Spins: <span className="text-red-600 ml-1 text-base">{spinCount}</span>
        </span>
      </div>

      {/* LEFT SIDE: Wheel */}
      <div className="flex-[1.4] h-full max-h-[85vh] max-w-[85vh] relative flex items-center justify-center">
        {/* Pointer Triangle - Red at the top */}
        <div className="absolute top-2 z-30 flex flex-col items-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
          <svg width="56" height="76" viewBox="0 0 56 76" className="relative z-10 translate-y-2">
            <path d="M 4 4 L 52 4 L 28 72 Z" fill="#dc2626" stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Wheel Base Container */}
        <div 
          className="relative w-full h-full rounded-full bg-white flex items-center justify-center"
          style={{ 
            boxShadow: "0 20px 60px -15px rgba(0,0,0,0.3), inset 0 0 0 12px #f8fafc"
          }}
        >
          {/* Rotating Wheel Content */}
          <div 
            ref={wheelRef}
            className="w-full h-full rounded-full relative overflow-hidden"
            style={{ 
              background: `conic-gradient(${conicGradientStr})`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Draw clear separating lines for each section */}
            {SECTIONS.map((_, i) => (
              <div 
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 w-[50%] h-[4px] bg-white transform origin-left z-10"
                style={{ 
                  transform: `translate(0, -50%) rotate(${i * 30}deg)`, 
                }}
              />
            ))}

            {/* Render Items */}
            {SECTIONS.map((section, i) => {
              const angle = i * 30 + 15;
              
              return (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-full h-[60px] flex items-center z-10 pointer-events-none"
                  style={{ 
                    transform: `translate(-50%, -50%) rotate(${angle - 90}deg)`, 
                    transformOrigin: "center center",
                  }}
                >
                  <div className="flex flex-col items-center justify-center ml-auto mr-12 lg:mr-16 transform rotate-90" style={{ maxWidth: '80px' }}>
                    {section.img ? (
                      <img src={section.img} alt={section.name} className="w-14 h-14 lg:w-20 lg:h-20 object-contain drop-shadow-md rounded-lg p-1 bg-white/20" />
                    ) : (
                      <div className="w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center text-4xl">😊</div>
                    )}
                    <span className="text-white font-black text-[11px] lg:text-sm tracking-wide mt-1 text-center leading-tight drop-shadow-md whitespace-pre-wrap">
                      {section.name}
                    </span>
                  </div>
                  
                  {/* Little black pegs at the edge like the image */}
                  <div className="absolute right-0 w-6 h-6 bg-black rounded-full border-4 border-white shadow-md transform translate-x-1/2" />
                </div>
              );
            })}
            
            {/* Center Spiral Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white shadow-2xl z-20 flex items-center justify-center border-[6px] border-slate-100">
               {/* Hypnotic/spiral pattern */}
               <div className="w-24 h-24 rounded-full border-4 border-red-500 animate-[spin_4s_linear_infinite]"
                    style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}>
               </div>
               <div className="absolute w-14 h-14 rounded-full border-4 border-red-500 animate-[spin_3s_linear_infinite_reverse]"
                    style={{ borderBottomColor: "transparent", borderLeftColor: "transparent" }}>
               </div>
               {/* Center bolt */}
               <div className="absolute w-8 h-8 bg-slate-800 rounded-full border-4 border-slate-400 shadow-inner flex items-center justify-center">
                 <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Content & Controls */}
      <div className="w-[340px] sm:w-[380px] shrink-0 h-full flex flex-col items-center justify-center text-center px-2 py-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="flex-none flex flex-col items-center justify-center pt-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 drop-shadow-sm mb-1 uppercase leading-none">
            Bumper Finale
          </h1>
          <p className="text-sm text-slate-500 font-bold tracking-wider mb-2">
            {customerName ? `SPIN THE WHEEL, ${customerName.toUpperCase()}!` : "SPIN TO WIN!"}
          </p>
        </div>

        {/* Prize Showcase Grid */}
        <div className="w-full flex-shrink min-h-0 flex flex-col justify-center mb-4 relative py-2">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-100/30 to-transparent pointer-events-none rounded-3xl" />
          
          <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 z-10 flex items-center justify-center gap-2 drop-shadow-sm">
             <Trophy className="w-3.5 h-3.5" /> Bumper Prizes <Trophy className="w-3.5 h-3.5" />
          </h3>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 z-10 p-1">
             {BUMPER_PRIZES.map((prize, idx) => {
                const isWon = wonPrizeIds.includes(prize.id);
                return (
                <div key={idx} className={`relative bg-white rounded-2xl p-2 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-2 border-slate-50 transition-all group ${idx === 6 ? "col-span-2 flex-row gap-4" : "flex-col"} ${isWon ? "opacity-70 grayscale-[0.6]" : "hover:border-amber-300"}`}>
                   {isWon && (
                     <div className="absolute inset-0 bg-black/5 rounded-2xl flex items-center justify-center z-20 backdrop-blur-[0.5px]">
                       <div className="bg-emerald-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full border-2 border-white shadow-md transform -rotate-12 flex items-center gap-1">
                         ✓ WON
                       </div>
                     </div>
                   )}
                   <img src={prize.img} alt={prize.name} className={`object-contain drop-shadow-sm transition-transform ${idx === 6 ? "w-12 h-12" : "w-12 h-12"} ${!isWon && "group-hover:scale-110"}`} />
                   <div className={`flex flex-col ${idx === 6 ? "items-start text-left" : "items-center mt-1.5 text-center"}`}>
                     <span className="text-[10px] font-black text-slate-800 uppercase leading-tight">{prize.name}</span>
                     {idx === 6 && <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">{prize.fullName}</span>}
                   </div>
                </div>
             )})}
          </div>
        </div>

        <div className="flex-none w-full pb-2">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full py-4 px-6 rounded-full font-black text-2xl tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 border-4 border-white shadow-xl active:scale-95 ${
              isSpinning
                ? "bg-slate-300 text-slate-500 cursor-not-allowed scale-95"
                : "bg-red-600 hover:bg-red-500 hover:scale-105 text-white animate-pulse"
            }`}
          >
            <Play className={`w-6 h-6 ${isSpinning ? "animate-spin" : ""}`} />
            {isSpinning ? "SPINNING..." : "SPIN NOW"}
          </button>
        </div>
      </div>

      {showWinner && winningPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white p-1 rounded-3xl max-w-md w-full animate-in zoom-in duration-500 shadow-2xl">
            <div className="bg-slate-50 rounded-[22px] p-8 text-center flex flex-col items-center">
              <div className="w-32 h-32 mb-6 relative animate-bounce">
                {winningPrize.img ? (
                  <img src={winningPrize.img} alt={winningPrize.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full text-8xl flex items-center justify-center">😊</div>
                )}
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">{winningPrize.name}</h2>
              <p className="text-slate-600 font-bold mb-8">
                {winningPrize.id === "better-luck" ? "Oh no! Better luck next time." : "Congratulations! You won a bumper prize!"}
              </p>
              <Link href="/?celebrate=grand" className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-lg flex items-center justify-center gap-2 transition-colors">
                <Trophy className="w-5 h-5 text-yellow-300" />
                VIEW ALL WINNINGS
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
