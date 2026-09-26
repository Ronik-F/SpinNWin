"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import FerrisWheel from "./components/FerrisWheel";
import SceneryBackdrop from "./components/SceneryBackdrop";
import FestiveBanner from "./components/FestiveBanner";
import WinnerModal from "./components/WinnerModal";
import CustomerDetailsModal from "./components/CustomerDetailsModal";
import GrandDoubleWinnerModal from "./components/GrandDoubleWinnerModal";
import PrizePoolCatalogModal from "./components/PrizePoolCatalogModal";
import { INITIAL_PRIZES } from "./data/prizes";
import { playTickSound, playWhooshSound, playWinFanfare } from "./utils/audio";
import { pickWeightedWinnerIndex } from "./utils/weightedRandom";
import {
  getCustomerSession,
  saveCustomerSession,
  clearCustomerSession,
} from "./utils/session";
import { Shuffle, Play, Gift, Sparkles, User, Trophy } from "lucide-react";

export default function Home() {
  const [prizes, setPrizes] = useState(INITIAL_PRIZES);
  const [rotation, setRotation] = useState(0);
  const [swayAngle, setSwayAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Customer & Grand Finale Modal states
  const [customerSession, setCustomerSession] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isGrandModalOpen, setIsGrandModalOpen] = useState(false);

  // References for animation loop
  const animRef = useRef(null);
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const lastTickIndexRef = useRef(0);

  // Check customer session and grand celebration trigger on mount
  useEffect(() => {
    const sess = getCustomerSession();
    if (sess) {
      setCustomerSession(sess);
    }

    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const isGrand =
        searchParams.get("celebrate") === "grand" ||
        (sess?.prize1 && sess?.prize2 && sess?.prize3);
      if (isGrand && sess) {
        setIsGrandModalOpen(true);
      }
    }
  }, []);

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
  const executeSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsModalOpen(false);
    setWinningIndex(null);
    setSelectedPrize(null);

    playWhooshSound(false);

    // Pick winning prize index using the Inverse-Price Hierarchy Algorithm:
    const targetPrizeIndex = pickWeightedWinnerIndex(prizes, 1.0);

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
    const a = 0.15; // ramp up fraction (~1.8s)
    const b = 0.35; // cruise end fraction (~4.2s)
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
        // Spin Complete at exactly 12 seconds
        wheelRef.current?.setTransform(totalRotationTarget, 0);
        setRotation(totalRotationTarget);
        setSwayAngle(0);
        setIsSpinning(false);
        setWinningIndex(targetPrizeIndex);

        const wonPrize = prizes[targetPrizeIndex];
        setSelectedPrize(wonPrize);

        // Record Prize 1 to customer session
        saveCustomerSession({ prize1: wonPrize });

        playWinFanfare(false);

        // Open Winner Celebration Modal
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [isSpinning, prizes]);

  // Click Spin Check: Prompt for Customer Details if not yet entered
  const handleSpinClick = useCallback(() => {
    if (isSpinning) return;

    // Check if customer name is already saved in session
    const sess = getCustomerSession();
    if (!sess?.name) {
      setIsCustomerModalOpen(true);
    } else {
      executeSpin();
    }
  }, [isSpinning, executeSpin]);

  // Handle Customer Details Submission
  const handleCustomerSubmit = ({ name, phone }) => {
    const updated = saveCustomerSession({ name, phone });
    setCustomerSession(updated);
    setIsCustomerModalOpen(false);

    // Immediately trigger wheel spin after detail submission
    executeSpin();
  };

  // Reset session for a new customer
  const handleResetForNewCustomer = () => {
    clearCustomerSession();
    setCustomerSession(null);
    setIsGrandModalOpen(false);
    setSelectedPrize(null);
    setWinningIndex(null);

    // Clean URL query
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  // Spacebar to trigger spin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.code === "Space" &&
        !isSpinning &&
        !isModalOpen &&
        !isCustomerModalOpen &&
        !isGrandModalOpen
      ) {
        e.preventDefault();
        handleSpinClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleSpinClick,
    isSpinning,
    isModalOpen,
    isCustomerModalOpen,
    isGrandModalOpen,
  ]);

  return (
    <div className="relative h-screen max-h-screen w-screen overflow-hidden flex flex-col justify-center text-slate-800 font-sans select-none p-2 sm:p-4">
      {/* Mountain & Kite Scenery Backdrop */}
      <SceneryBackdrop />

      {/* Top Right Floating CashPatti Link Button & Grand Celebration shortcut */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 z-40 flex items-center gap-2">
        {/* If customer already has prizes recorded, show Celebration Button */}
        {customerSession?.prize1 && customerSession?.prize2 && customerSession?.prize3 && (
          <button
            onClick={() => setIsGrandModalOpen(true)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide border-2 border-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
            title="View prizes won"
          >
            <Trophy className="w-4 h-4 text-slate-900" />
            <span>३ वटै उपहार हेर्नुहोस्</span>
          </button>
        )}

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
        {/* Left Side: Massive Ferris Wheel */}
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

        {/* Right Side: 3D Festive Nepali Typography, Linge Ping, Artwork, and Spin Action Controls */}
        <div className="w-[340px] sm:w-[370px] lg:w-[400px] shrink-0 h-full flex flex-col items-center justify-center text-center px-1 min-h-0 gap-2.5 relative">
          {/* Authentic 3D Festive Title & Linge Ping Hero Art */}
          <FestiveBanner />

          {/* Customer Badge if details are already registered */}
          {customerSession?.name && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-400/60 shadow-md text-xs font-bold text-slate-800">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>
                खेलाडी: <strong className="text-amber-700">{customerSession.name}</strong>
              </span>
              <button
                onClick={() => setIsCustomerModalOpen(true)}
                className="text-[10px] text-blue-600 hover:underline font-bold ml-1 cursor-pointer"
              >
                (बदल्नुहोस्)
              </button>
            </div>
          )}

          {/* Catchy Spin Actions */}
          <div className="w-full flex flex-col items-center gap-2 mt-0.5 z-20">
            {/* Big Primary Spin Button with 3D Gold Ring */}
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
              <Play
                className={`w-7 h-7 fill-current ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
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

      {/* Customer Details Modal (Dashain & Tihar Themed) */}
      <CustomerDetailsModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSubmit={handleCustomerSubmit}
      />

      {/* Winner Celebration Modal (Prize 1 with 5s countdown redirect to CashPatti) */}
      <WinnerModal
        prize={selectedPrize}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerName={customerSession?.name}
      />

      {/* Grand Double Winner Celebration Modal (Customer Name + BOTH Prizes at same time) */}
      <GrandDoubleWinnerModal
        isOpen={isGrandModalOpen}
        onClose={() => setIsGrandModalOpen(false)}
        sessionData={customerSession}
        onResetSession={handleResetForNewCustomer}
      />

      {/* All Prizes & Prices Catalog Modal */}
      <PrizePoolCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        prizes={prizes}
        isAdmin={false}
      />
    </div>
  );
}
