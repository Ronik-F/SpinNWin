"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FerrisWheel from "../components/FerrisWheel";
import SceneryBackdrop from "../components/SceneryBackdrop";
import FestiveBanner from "../components/FestiveBanner";
import WinnerModal3 from "./components/WinnerModal3";
import { INITIAL_PRIZES } from "../data/prizes";
import { playTickSound, playWhooshSound, playWinFanfare } from "../utils/audio";
import { pickWeightedWinnerIndex } from "../utils/weightedRandom";
import {
  getCustomerSession,
  saveCustomerSession,
} from "../utils/session";
import { Play, Shuffle, Gift, Sparkles, User } from "lucide-react";
import TiharLights from "../components/TiharLights";

export default function Spin2Page() {
  const [prizes, setPrizes] = useState(INITIAL_PRIZES);
  const [rotation, setRotation] = useState(0);
  const [swayAngle, setSwayAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);

  // Customer session
  const [customerSession, setCustomerSession] = useState(null);

  // References for animation loop
  const animRef = useRef(null);
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const lastTickIndexRef = useRef(0);

  // Load session on mount & fade in
  useEffect(() => {
    const sess = getCustomerSession();
    if (sess) setCustomerSession(sess);

    // Fade-in entrance animation
    const t = setTimeout(() => setIsFadingIn(false), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    currentRotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Shuffle prize positions
  const handleShuffle = useCallback(() => {
    if (isSpinning) return;
    const shuffled = [...prizes].sort(() => Math.random() - 0.5);
    setPrizes(shuffled);
    setWinningIndex(null);
    setSelectedPrize(null);
  }, [isSpinning, prizes]);

  // Main 12-Second Smooth Spin Execution
  const executeSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsModalOpen(false);
    setWinningIndex(null);
    setSelectedPrize(null);

    playWhooshSound(false);

    const targetPrizeIndex = pickWeightedWinnerIndex(prizes, 1.0);

    const desiredRemainder = ((180 - targetPrizeIndex * 36) % 360 + 360) % 360;

    const startRot = currentRotationRef.current;
    const currentRem = ((startRot % 360) + 360) % 360;

    const fullSpins = 5;
    let delta = desiredRemainder - currentRem;
    if (delta <= 0) {
      delta += 360;
    }
    const totalRotationTarget = startRot + fullSpins * 360 + delta;

    const durationMs = 12000;
    const startTime = performance.now();

    const a = 0.15;
    const b = 0.35;
    const decelIntegralTotal = 0.5;
    const Vmax = 1 / (b - a / 2 + decelIntegralTotal * (1 - b));
    const Pa = (Vmax * a) / 2;
    const Pb = Vmax * (b - a / 2);

    const getProgress = (u) => {
      if (u <= 0) return 0;
      if (u >= 1) return 1;
      if (u <= a) {
        return (Vmax / 2) * (u - (a / Math.PI) * Math.sin((u / a) * Math.PI));
      } else if (u <= b) {
        return Vmax * (u - a / 2);
      } else {
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

      const currentTickIndex = Math.floor(newRot / 36);
      if (currentTickIndex !== lastTickIndexRef.current) {
        lastTickIndexRef.current = currentTickIndex;
        const speedFactor = u < a ? u / a : u > b ? (1 - u) / (1 - b) : 1;
        playTickSound(false, 0.75 + speedFactor * 0.45);
      }

      let dynamicTilt = 0;
      if (u < 1) {
        if (u <= a) {
          dynamicTilt = -3.8 * Math.sin((u / a) * (Math.PI / 2));
        } else if (u <= b) {
          dynamicTilt = -1.8 + 1.4 * Math.sin(elapsed * 0.006);
        } else {
          const tau = (u - b) / (1 - b);
          const remainingVelocity = Math.pow(1 - tau, 2) * (1 + 2 * tau);
          dynamicTilt =
            remainingVelocity * (2.8 * Math.cos(elapsed * 0.005) - 0.8);
        }

        wheelRef.current?.setTransform(newRot, dynamicTilt);
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Spin Complete
        wheelRef.current?.setTransform(totalRotationTarget, 0);
        setRotation(totalRotationTarget);
        setSwayAngle(0);
        setIsSpinning(false);
        setWinningIndex(targetPrizeIndex);

        const wonPrize = prizes[targetPrizeIndex];
        setSelectedPrize(wonPrize);

        // Record Prize 3 to customer session
        saveCustomerSession({ prize3: wonPrize });

        playWinFanfare(false);

        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [isSpinning, prizes]);

  const handleSpinClick = useCallback(() => {
    if (isSpinning) return;
    executeSpin();
  }, [isSpinning, executeSpin]);

  // Spacebar to spin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isSpinning && !isModalOpen) {
        e.preventDefault();
        handleSpinClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSpinClick, isSpinning, isModalOpen]);

  return (
    <div
      className="relative h-screen max-h-screen w-screen overflow-hidden flex flex-col justify-center text-slate-800 font-sans select-none p-2 sm:p-4"
      style={{
        opacity: isFadingIn ? 0 : 1,
        transition: "opacity 0.6s ease-out",
      }}
    >
      {/* Mountain & Kite Scenery Backdrop */}
      <SceneryBackdrop />

      {/* Tihar lights top */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <TiharLights className="w-full" />
      </div>

      {/* Top badge: Game 3 indicator */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 hidden sm:flex">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 text-white font-black text-xs uppercase tracking-widest border-2 border-white/30 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>🎡 तेस्रो खेल • SPIN 3 OF 3</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        </div>
      </div>

      {/* Customer name badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 z-40">
        {customerSession?.name && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-400/60 shadow-md text-xs font-bold text-slate-800">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>
              खेलाडी: <strong className="text-amber-700">{customerSession.name}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Main layout */}
      <main className="relative z-10 flex-1 min-h-0 w-full max-w-[1560px] mx-auto flex flex-row items-center justify-center gap-4 lg:gap-8 xl:gap-10 px-2 sm:px-4 md:px-6 overflow-hidden">
        {/* Left: Ferris Wheel */}
        <div className="flex-[1.4] max-w-[1020px] w-full h-full flex items-center justify-center min-h-0 relative">
          <FerrisWheel
            ref={wheelRef}
            prizes={prizes}
            rotation={rotation}
            swayAngle={swayAngle}
            winningIndex={winningIndex}
            isSpinning={isSpinning}
            onSpinClick={handleSpinClick}
          />
        </div>

        {/* Right: Controls */}
        <div className="w-[340px] sm:w-[370px] lg:w-[400px] shrink-0 h-full flex flex-col items-center justify-center text-center px-1 min-h-0 gap-2.5 relative">
          <FestiveBanner />

          {/* Prize 1 & 2 reminder */}
          {(customerSession?.prize1 || customerSession?.prize2) && (
            <div className="w-full max-w-[310px] rounded-2xl bg-white/20 backdrop-blur border border-amber-300/50 p-2.5 flex flex-col gap-1.5 text-left text-xs shadow-md">
              <div className="text-amber-100 font-black text-[10px] uppercase tracking-widest text-center mb-0.5">
                🎁 अघिको जितेका उपहारहरू
              </div>
              {customerSession?.prize1 && (
                <div className="flex items-center gap-1.5 text-white">
                  <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded-full font-black">🎡 १</span>
                  <span className="font-bold truncate">{customerSession.prize1.name}</span>
                </div>
              )}
              {customerSession?.prize2?.won && customerSession.prize2.prizeValue > 0 ? (
                <div className="flex items-center gap-1.5 text-white">
                  <span className="text-[10px] bg-purple-600 px-1.5 py-0.5 rounded-full font-black">🃏 २</span>
                  <span className="font-bold">{customerSession.prize2.prizeLabel || "Cash Prize"}</span>
                </div>
              ) : customerSession?.prize2 ? (
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[10px] bg-slate-600 px-1.5 py-0.5 rounded-full font-black">🃏 २</span>
                  <span className="font-bold">Better Luck</span>
                </div>
              ) : null}
            </div>
          )}

          {/* Spin Controls */}
          <div className="w-full flex flex-col items-center gap-2 mt-0.5 z-20">
            <button
              onClick={handleSpinClick}
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

            {/* Shuffle */}
            <button
              onClick={handleShuffle}
              disabled={isSpinning}
              className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-black border-2 border-white/80 shadow-md transition-all active:scale-95 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:shadow-lg"
              title="Randomly shuffle cabin prize positions"
            >
              <Shuffle className="w-3.5 h-3.5 text-blue-600" />
              <span>Shuffle</span>
            </button>
          </div>
        </div>
      </main>

      {/* Winner Celebration Modal (Prize 3 - redirects to grand celebration) */}
      <WinnerModal3
        prize={selectedPrize}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerName={customerSession?.name}
      />
    </div>
  );
}
