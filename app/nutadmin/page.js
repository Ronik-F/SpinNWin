"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FerrisWheel from "../components/FerrisWheel";
import SceneryBackdrop from "../components/SceneryBackdrop";
import FestiveBanner from "../components/FestiveBanner";
import WinnerModal from "../components/WinnerModal";
import PrizePoolCatalogModal from "../components/PrizePoolCatalogModal";
import AdminOddsPanel from "../components/AdminOddsPanel";
import AdminProductPanel from "../components/AdminProductPanel";
import { INITIAL_PRIZES } from "../data/prizes";
import { playTickSound, playWhooshSound, playWinFanfare } from "../utils/audio";
import { pickWeightedWinnerIndexWithCustomOdds } from "../utils/weightedRandom";
import { Shuffle, Play, Gift } from "lucide-react";

export default function NutAdminPage() {
  const [prizes, setPrizes] = useState(INITIAL_PRIZES);
  const [rotation, setRotation] = useState(0);
  const [swayAngle, setSwayAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAdminOddsOpen, setIsAdminOddsOpen] = useState(false);
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [customOdds, setCustomOdds] = useState(null);


  const animRef = useRef(null);
  const wheelRef = useRef(null);
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

  // Main 12-Second Smooth Spin Execution
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsModalOpen(false);
    setWinningIndex(null);
    setSelectedPrize(null);

    playWhooshSound(false);

    // Pick winning prize index using Custom Odds if set, otherwise smart inverse-price hierarchy
    const targetPrizeIndex = pickWeightedWinnerIndexWithCustomOdds(prizes, customOdds, 1.0);

    // Spoke i starts at (i * 36) deg from top (12 o'clock).
    // Bottom winner pedestal is at 180 degrees (6 o'clock).
    const desiredRemainder = ((180 - targetPrizeIndex * 36) % 360 + 360) % 360;

    const startRot = currentRotationRef.current;
    const currentRem = ((startRot % 360) + 360) % 360;

    // 5 full rotations over 12 seconds: majestic, calm, and readable motion
    const fullSpins = 5;
    let delta = desiredRemainder - currentRem;
    if (delta <= 0) {
      delta += 360;
    }
    const totalRotationTarget = startRot + fullSpins * 360 + delta;

    // EXACTLY 12 SECONDS (12000ms)
    const durationMs = 12000;
    const startTime = performance.now();

    // C2-Continuous S-Curve with zero jerk and physical friction deceleration:
    // Ramp up (0 - 1.8s) -> Gentle cruise (1.8s - 4.2s) -> Suspenseful friction crawl (4.2s - 12.0s)
    const a = 0.15; // ramp up fraction (~1.8s)
    const b = 0.35; // cruise end fraction (~4.2s)
    // Integral of (1 - tau)^2 * (1 + 2*tau) from 0 to 1 is 0.5
    const decelIntegralTotal = 0.5;
    const Vmax = 1 / (b - a / 2 + decelIntegralTotal * (1 - b));
    const Pa = (Vmax * a) / 2;
    const Pb = Vmax * (b - a / 2);

    const getProgress = (u) => {
      if (u <= 0) return 0;
      if (u >= 1) return 1;
      if (u <= a) {
        // Continuous acceleration with zero jerk at start and end of ramp
        return (Vmax / 2) * (u - (a / Math.PI) * Math.sin((u / a) * Math.PI));
      } else if (u <= b) {
        // Smooth constant cruise velocity
        return Vmax * (u - a / 2);
      } else {
        // C2 continuous friction deceleration with natural suspenseful tail
        const tau = (u - b) / (1 - b);
        const decelIntegral = tau - Math.pow(tau, 3) + 0.5 * Math.pow(tau, 4);
        return Pb + Vmax * (1 - b) * decelIntegral;
      }
    };

    lastTickIndexRef.current = Math.floor(startRot / 36);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const u = Math.min(elapsed / durationMs, 1);
      const easedProgress = getProgress(u);

      const newRot = startRot + (totalRotationTarget - startRot) * easedProgress;
      currentRotationRef.current = newRot;

      // Spoke click sound on crossing each 36 deg sector
      const currentTickIndex = Math.floor(newRot / 36);
      if (currentTickIndex !== lastTickIndexRef.current) {
        lastTickIndexRef.current = currentTickIndex;
        const speedFactor = u < a ? u / a : u > b ? (1 - u) / (1 - b) : 1;
        playTickSound(false, 0.75 + speedFactor * 0.45);
      }

      // Dynamic Cabin Pendulum Sway (smooth physics)
      let dynamicTilt = 0;
      if (u < 1) {
        if (u <= a) {
          // Inertia lag during acceleration
          dynamicTilt = -3.8 * Math.sin((u / a) * (Math.PI / 2));
        } else if (u <= b) {
          // Gentle breeze oscillation during cruise
          dynamicTilt = -1.8 + 1.4 * Math.sin(elapsed * 0.006);
        } else {
          // Damped settling oscillation during deceleration
          const tau = (u - b) / (1 - b);
          const remainingVelocity = Math.pow(1 - tau, 2) * (1 + 2 * tau);
          dynamicTilt = remainingVelocity * (2.8 * Math.cos(elapsed * 0.005) - 0.8);
        }

        // Direct hardware-accelerated SVG transform: 0 React re-renders, silky smooth 60/120fps!
        wheelRef.current?.setTransform(newRot, dynamicTilt);
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Spin Complete at exactly 12 seconds
        wheelRef.current?.setTransform(totalRotationTarget, 0);
        setRotation(totalRotationTarget);
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
  }, [isSpinning, prizes, customOdds]);

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

      {/* Main Screen Layout: Wheel and Right Hero Section brought close together */}
      <main className="relative z-10 flex-1 min-h-0 w-full max-w-[1420px] mx-auto flex flex-row items-center justify-center gap-6 lg:gap-10 xl:gap-14 px-3 sm:px-6 overflow-hidden">
        {/* Left Side: Massive Ferris Wheel */}
        <div className="flex-1 max-w-[860px] h-full flex items-center justify-center min-h-0 relative">
          <FerrisWheel
            ref={wheelRef}
            prizes={prizes}
            rotation={rotation}
            swayAngle={swayAngle}
            winningIndex={winningIndex}
            isSpinning={isSpinning}
            onSpinClick={handleSpin}
          />
        </div>

        {/* Right Side: 3D Festive Nepali Typography, Linge Ping, Artwork, and Spin Action Controls */}
        <div className="w-[360px] sm:w-[390px] lg:w-[420px] xl:w-[440px] shrink-0 h-full flex flex-col items-center justify-center text-center px-1 min-h-0 gap-3 relative">
          {/* Authentic 3D Festive Title & Linge Ping Hero Art */}
          <FestiveBanner />

          {/* Catchy Spin Actions */}
          <div className="w-full flex flex-col items-center gap-2.5 mt-1 z-20">
            {/* Big Primary Spin Button with 3D Gold Ring */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full max-w-[310px] py-3.5 px-6 rounded-full font-black text-xl sm:text-2xl tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 border-4 border-white shadow-[0_10px_30px_rgba(234,88,12,0.45)] ring-4 ring-amber-400/70 active:scale-95 cursor-pointer relative overflow-hidden group ${isSpinning
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

              {/* All 12 Products & Prices Modal Button */}
              <button
                onClick={() => setIsCatalogOpen(true)}
                disabled={isSpinning}
                className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black border-2 border-amber-300 shadow-md transition-all active:scale-95 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:shadow-lg"
                title="View all 10 products, prices, and hierarchy"
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

      />

      {/* All 12 Prizes & Prices Catalog / Odds Inspector Modal */}
      <PrizePoolCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        prizes={prizes}
        customOdds={customOdds}
        onOpenAdminOdds={() => { setIsCatalogOpen(false); setIsAdminOddsOpen(true); }}
        onOpenProductEditor={() => { setIsCatalogOpen(false); setIsProductEditorOpen(true); }}
      />

      {/* Admin Odds Control Panel */}
      <AdminOddsPanel
        isOpen={isAdminOddsOpen}
        onClose={() => setIsAdminOddsOpen(false)}
        prizes={prizes}
        onOddsChange={(odds) => { setCustomOdds(odds); setIsAdminOddsOpen(false); }}
      />

      {/* Admin Product Editor */}
      <AdminProductPanel
        isOpen={isProductEditorOpen}
        onClose={() => setIsProductEditorOpen(false)}
        prizes={prizes}
        onPrizesChange={(updated) => {
          setPrizes(updated);
          // Reset custom odds so they recalculate from the new prices
          setCustomOdds(null);
          setIsProductEditorOpen(false);
        }}
      />
    </div>
  );
}
