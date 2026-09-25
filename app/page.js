"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import FerrisWheel from "./components/FerrisWheel";
import SceneryBackdrop from "./components/SceneryBackdrop";
import FestiveBanner from "./components/FestiveBanner";
import WinnerModal from "./components/WinnerModal";
import PrizePoolCatalogModal from "./components/PrizePoolCatalogModal";
import { INITIAL_PRIZES } from "./data/prizes";
import { playTickSound, playWhooshSound, playWinFanfare } from "./utils/audio";
import { pickWeightedWinnerIndex } from "./utils/weightedRandom";
import { Shuffle, Play, Gift, Sparkles } from "lucide-react";

export default function Home() {
  const [prizes, setPrizes] = useState(INITIAL_PRIZES);
  const [rotation, setRotation] = useState(0);
  const [swayAngle, setSwayAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // References for animation loop
  const animRef = useRef(null);
  const currentRotationRef = useRef(0);
  const lastTickIndexRef = useRef(0);

  useEffect(() => {
    currentRotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Shuffle prize positions around the wheel
  const handleShuffle = useCallback(() => {
    if (isSpinning) return;
    const shuffled = [...prizes].sort(() => Math.random() - 0.5);
    setPrizes(shuffled);
    setWinningIndex(null);
    setSelectedPrize(null);
  }, [isSpinning, prizes]);

  // Main 20-Second Spin Execution
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsModalOpen(false);
    setWinningIndex(null);
    setSelectedPrize(null);

    playWhooshSound(false);

    // Pick winning prize index using the Inverse-Price Hierarchy Algorithm (Cheating Logic):
    // Products with the least price have greater odds/chances to win.
    // Higher price models (Grand Prize) have significantly lower odds.
    const targetPrizeIndex = pickWeightedWinnerIndex(prizes, 1.0);

    // Spoke i starts at (i * 36) deg from top (12 o'clock).
    // Bottom winner pedestal is at 180 degrees (6 o'clock).
    const desiredRemainder = ((180 - targetPrizeIndex * 36) % 360 + 360) % 360;

    const startRot = currentRotationRef.current;
    const currentRem = ((startRot % 360) + 360) % 360;
    
    // In 20 seconds: 12 full rotations for great momentum
    const fullSpins = 12;
    let delta = desiredRemainder - currentRem;
    if (delta <= 0) {
      delta += 360;
    }
    const totalRotationTarget = startRot + fullSpins * 360 + delta;

    // EXACTLY 20 SECONDS (20000ms)
    const durationMs = 20000;
    const startTime = performance.now();

    // Piecewise smooth S-curve progress:
    // Ramp up (0 - 3.5s) -> Fast cruise (3.5s - 11s) -> Suspenseful friction deceleration (11s - 20s)
    const a = 0.16; // ramp up fraction (~3.2s)
    const b = 0.55; // end of cruise fraction (~11s)
    const Vmax = 1 / ((2 * a / Math.PI) + (b - a) + ((1 - b) / 4));
    const Pa = (Vmax * 2 * a / Math.PI);
    const Pb = Pa + Vmax * (b - a);

    const getProgress = (u) => {
      if (u <= 0) return 0;
      if (u >= 1) return 1;
      if (u <= a) {
        return (Vmax * 2 * a / Math.PI) * (1 - Math.cos((u / a) * (Math.PI / 2)));
      } else if (u <= b) {
        return Pa + Vmax * (u - a);
      } else {
        const decay = (1 - u) / (1 - b);
        return 1 - (1 - Pb) * Math.pow(decay, 4);
      }
    };

    lastTickIndexRef.current = Math.floor(startRot / 36);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const u = Math.min(elapsed / durationMs, 1);
      const easedProgress = getProgress(u);

      const newRot = startRot + (totalRotationTarget - startRot) * easedProgress;
      setRotation(newRot);
      currentRotationRef.current = newRot;

      // Spoke click sound on crossing each 36 deg sector
      const currentTickIndex = Math.floor(newRot / 36);
      if (currentTickIndex !== lastTickIndexRef.current) {
        lastTickIndexRef.current = currentTickIndex;
        const speed = u < a ? u / a : u > b ? (1 - u) / (1 - b) : 1;
        playTickSound(false, 0.75 + speed * 0.5);
      }

      // Dynamic Cabin Pendulum Sway
      if (u < 1) {
        const speedFactor = u < a ? u / a : u > b ? (1 - u) / (1 - b) : 1;
        const oscillation = Math.sin(elapsed * 0.007) * (speedFactor * 7);
        const dynamicTilt = -Math.min(speedFactor * 6, 8) + oscillation;
        setSwayAngle(dynamicTilt);
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Spin Complete at exactly 20 seconds!
        setRotation(totalRotationTarget);
        currentRotationRef.current = totalRotationTarget;
        setSwayAngle(0);
        setIsSpinning(false);
        setWinningIndex(targetPrizeIndex);
        setSelectedPrize(prizes[targetPrizeIndex]);

        playWinFanfare(false);

        // Open Winner Celebration Modal
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [isSpinning, prizes]);

  // Spacebar to trigger spin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isSpinning && !isModalOpen) {
        e.preventDefault();
        handleSpin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSpin, isSpinning, isModalOpen]);

  return (
    <div className="relative h-screen max-h-screen w-screen overflow-hidden flex flex-col justify-center text-slate-800 font-sans select-none p-2 sm:p-4">
      {/* Mountain & Kite Scenery Backdrop */}
      <SceneryBackdrop />

      {/* Top Right Floating CashPatti Link Button */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 z-40">
        <Link
          href="/cashpatti"
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-800 via-indigo-700 to-amber-600 hover:from-purple-700 hover:to-amber-500 text-white font-black text-xs sm:text-sm tracking-wide border-2 border-white shadow-[0_8px_24px_rgba(124,58,237,0.45)] ring-2 ring-amber-400/80 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group no-underline relative overflow-hidden backdrop-blur-sm"
          title="Play CashPatti Teen Patti Game"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
          <span>🃏 CashPatti (क्यास पत्ती)</span>
        </Link>
      </div>

      {/* Main Screen Layout: Wheel and Right Hero Section brought close together */}
      <main className="relative z-10 flex-1 min-h-0 w-full max-w-[1560px] mx-auto flex flex-row items-center justify-center gap-4 lg:gap-8 xl:gap-10 px-2 sm:px-4 md:px-6 overflow-hidden">
        {/* Left Side: Massive Ferris Wheel (Expanded to fill space generously) */}
        <div className="flex-[1.4] max-w-[1020px] w-full h-full flex items-center justify-center min-h-0 relative">
          <FerrisWheel
            prizes={prizes}
            rotation={rotation}
            swayAngle={swayAngle}
            winningIndex={winningIndex}
            isSpinning={isSpinning}
            onSpinClick={handleSpin}
          />
        </div>

        {/* Right Side: 3D Festive Nepali Typography, Linge Ping, Artwork, and Spin Action Controls */}
        <div className="w-[340px] sm:w-[370px] lg:w-[400px] shrink-0 h-full flex flex-col items-center justify-center text-center px-1 min-h-0 gap-2.5 relative">
          {/* Authentic 3D Festive Title & Linge Ping Hero Art */}
          <FestiveBanner />

          {/* Catchy Spin Actions */}
          <div className="w-full flex flex-col items-center gap-2 mt-0.5 z-20">
            {/* Big Primary Spin Button with 3D Gold Ring */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full max-w-[310px] py-3.5 px-6 rounded-full font-black text-xl sm:text-2xl tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 border-4 border-white shadow-[0_10px_30px_rgba(234,88,12,0.45)] ring-4 ring-amber-400/70 active:scale-95 cursor-pointer relative overflow-hidden group ${
                isSpinning
                  ? "bg-slate-400 text-slate-100 cursor-not-allowed scale-95 ring-slate-300"
                  : "bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white hover:scale-105 hover:ring-amber-300 animate-pulse"
              }`}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 pointer-events-none" />
              <Play className={`w-7 h-7 fill-current ${isSpinning ? "animate-spin" : ""}`} />
              <span>{isSpinning ? "घुम्दैछ..." : "घुमाउनुहोस् (SPIN)"}</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Shuffle Button */}
              <button
                onClick={handleShuffle}
                disabled={isSpinning}
                className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-black border-2 border-white/80 shadow-md transition-all active:scale-95 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:shadow-lg"
                title="Randomly shuffle cabin prize positions"
              >
                <Shuffle className="w-3.5 h-3.5 text-blue-600" />
                <span>Shuffle</span>
              </button>

              {/* All 10 Products & Prices Modal Button */}
              <button
                onClick={() => setIsCatalogOpen(true)}
                disabled={isSpinning}
                className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black border-2 border-amber-300 shadow-md transition-all active:scale-95 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:shadow-lg"
                title="View all 10 products, prices, and genuine gifts"
              >
                <Gift className="w-3.5 h-3.5 text-red-600" />
                <span>सबै १० उपहार र मूल्य</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Winner Celebration Modal */}
      <WinnerModal
        prize={selectedPrize}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSpinAgain={handleSpin}
      />

      {/* All 12 Prizes & Prices Catalog Modal (Public View - NO odds visible) */}
      <PrizePoolCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        prizes={prizes}
        isAdmin={false}
      />
    </div>
  );
}
