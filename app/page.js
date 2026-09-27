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
import { INITIAL_PRIZES, CASH_PRIZES, BUMPER_PRIZES } from "./data/prizes";
import { playTickSound, playWhooshSound, playWinFanfare } from "./utils/audio";
import { pickWeightedWinnerIndex } from "./utils/weightedRandom";
import {
  getCustomerSession,
  saveCustomerSession,
  clearCustomerSession,
  saveToWinnersHistory,
} from "./utils/session";
import { Shuffle, Play, Gift, Sparkles, User, Trophy, Users } from "lucide-react";

export default function Home() {
  const [prizes, setPrizes] = useState(CASH_PRIZES);
  const [spinCount, setSpinCount] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [swayAngle, setSwayAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [roundOverlay, setRoundOverlay] = useState(null);

  // Customer & Grand Finale Modal states
  const [customerSession, setCustomerSession] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isGrandModalOpen, setIsGrandModalOpen] = useState(false);

  // References for animation loop
  const animRef = useRef(null);
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const lastTickIndexRef = useRef(0);
  const executeSpinRef = useRef();

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
      } else if (sess?.prize2) {
        // No prizes needed for Round 3 in the Ferris Wheel.
        setPrizes([...CASH_PRIZES]); // Just keep cash or products
      } else if (sess?.prize1) {
        setPrizes([...INITIAL_PRIZES].sort(() => Math.random() - 0.5));
      }
    }
  }, []);

  useEffect(() => {
    // Update spin count based on the current round
    if (customerSession?.prize1) {
      const count = parseInt(localStorage.getItem("alamtech_round2_spins") || "0", 10);
      setSpinCount(count);
    } else {
      const count = parseInt(localStorage.getItem("alamtech_round1_spins") || "0", 10);
      setSpinCount(count);
    }
  }, [customerSession]);

  useEffect(() => {
    currentRotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleShuffle = useCallback(() => {
    if (isSpinning) return;
    const sess = getCustomerSession();
    const currentPrizes = sess?.prize1 ? INITIAL_PRIZES : CASH_PRIZES;
    const shuffled = [...currentPrizes].sort(() => Math.random() - 0.5);
    setPrizes(shuffled);
    setWinningIndex(null);
    setSelectedPrize(null);
  }, [isSpinning]);

  // Main 12-Second Smooth Spin Execution
  const executeSpin = useCallback(() => {
    if (isSpinning) return;
    
    const sess = getCustomerSession();
    const isRound3 = !!sess?.prize2;
    if (isRound3) {
      if (typeof window !== "undefined") window.location.href = "/bumper";
      return;
    }

    setIsSpinning(true);
    setIsModalOpen(false);
    setWinningIndex(null);
    setSelectedPrize(null);

    playWhooshSound(false);

    const isRound2 = !!sess?.prize1;
    let targetPrizeIndex = 0;

    if (isRound2) {
      // Round 2 (Products): Guarantee premium items starting at 19th spin, then every 30 spins
      const globalCountStr = localStorage.getItem("alamtech_round2_spins") || "0";
      let globalCount = parseInt(globalCountStr, 10) + 1;
      localStorage.setItem("alamtech_round2_spins", globalCount.toString());
      setSpinCount(globalCount);

      let forcedPremiumId = null;
      if (globalCount >= 19) {
        const offsetCount = globalCount - 19;
        if (offsetCount % 30 === 0) {
          const cycleMod = offsetCount % 90;
          if (cycleMod === 0) forcedPremiumId = "headphone";
          else if (cycleMod === 30) forcedPremiumId = "joystick";
          else if (cycleMod === 60) forcedPremiumId = "airpod";
        }
      }

      const premiumIds = ["headphone", "joystick", "airpod"];
      
      const eligibleIndices = [];
      prizes.forEach((p, idx) => {
        if (forcedPremiumId) {
          if (p.id === forcedPremiumId) eligibleIndices.push(idx);
        } else {
          // Normal spin: only standard items
          if (!premiumIds.includes(p.id)) eligibleIndices.push(idx);
        }
      });
      
      if (forcedPremiumId) {
        targetPrizeIndex = eligibleIndices[0];
      } else {
        // Weighted probability for standard items: similar but slightly different (~3-4% variance)
        // Laptop Stand: 27%, RGB Mouse: 26%, Bluetooth Mouse: 24%, Cleaner: 23%
        const weights = {
          "laptop-stand": 27,
          "rgb-mouse": 26,
          "bluetooth-mouse": 24,
          "cleaner": 23
        };
        
        let totalWeight = 0;
        const weightedIndices = eligibleIndices.map(idx => {
          const weight = weights[prizes[idx].id] || 25;
          totalWeight += weight;
          return { idx, weight, cumulativeWeight: totalWeight };
        });

        const random = Math.random() * totalWeight;
        const selected = weightedIndices.find(item => random <= item.cumulativeWeight);
        targetPrizeIndex = selected ? selected.idx : eligibleIndices[0];
      }
    } else {
      // Round 1 (Cash Prizes): Controlled probabilities and guaranteed wins
      const globalCountStr = localStorage.getItem("alamtech_round1_spins") || "0";
      let globalCount = parseInt(globalCountStr, 10) + 1;
      localStorage.setItem("alamtech_round1_spins", globalCount.toString());
      setSpinCount(globalCount);

      if (globalCount % 55 === 0) {
        // Exactly every 55th person wins Rs. 1000
        const index = prizes.findIndex(p => p.id === "cash-1000");
        targetPrizeIndex = index !== -1 ? index : 0;
      } else {
        // Normal spin: Exclude 1000, 5000, and 25000.
        // 200 and 300 get ~48% each (96% total). 500 gets ~4%.
        const weights = {
          "cash-200": 48,
          "cash-300": 48,
          "cash-500": 4
        };

        const eligibleIndices = [];
        let totalWeight = 0;
        const weightedIndices = [];

        prizes.forEach((p, idx) => {
          if (weights[p.id]) {
            eligibleIndices.push(idx);
            totalWeight += weights[p.id];
            weightedIndices.push({ idx, cumulativeWeight: totalWeight });
          }
        });

        const random = Math.random() * totalWeight;
        const selected = weightedIndices.find(item => random <= item.cumulativeWeight);
        targetPrizeIndex = selected ? selected.idx : eligibleIndices[0];
      }
    }

    const anglePerItem = 360 / (prizes.length || 1);

    // Spoke i starts at (i * anglePerItem) deg from top (12 o'clock).
    // Bottom winner pedestal is at 180 degrees (6 o'clock).
    const desiredRemainder = ((180 - targetPrizeIndex * anglePerItem) % 360 + 360) % 360;

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

    lastTickIndexRef.current = Math.floor(startRot / anglePerItem);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const u = Math.min(elapsed / durationMs, 1);
      const easedProgress = getProgress(u);

      const newRot = startRot + (totalRotationTarget - startRot) * easedProgress;
      currentRotationRef.current = newRot;

      // Spoke click sound on crossing each sector
      const currentTickIndex = Math.floor(newRot / anglePerItem);
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

        // Record Prize 1, 2, or 3 to customer session
        const sess = getCustomerSession() || {};
        let updated;
        if (!sess.prize1) {
          updated = saveCustomerSession({ prize1: wonPrize });
        } else if (!sess.prize2) {
          updated = saveCustomerSession({ prize2: wonPrize });
        } else if (!sess.prize3) {
          updated = saveCustomerSession({ prize3: wonPrize });
        }
        if (updated) setCustomerSession(updated);

        playWinFanfare(false);

        // Open Winner Celebration Modal
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [isSpinning, prizes]);

  const showRoundOverlay = useCallback((round) => {
    setRoundOverlay(round);
    setTimeout(() => {
      if (round === 3) {
        if (typeof window !== "undefined") window.location.href = "/bumper";
      } else {
        setRoundOverlay(null);
      }
    }, 2000);
  }, []);

  // Click Spin Check: Prompt for Customer Details if not yet entered
  const handleSpinClick = useCallback(() => {
    if (isSpinning || roundOverlay !== null) return;

    // Check if customer name is already saved in session
    const sess = getCustomerSession();
    if (!sess?.name) {
      setIsCustomerModalOpen(true);
    } else {
      executeSpin();
    }
  }, [isSpinning, roundOverlay, executeSpin]);

  // Handle Customer Details Submission
  const handleCustomerSubmit = ({ name, phone }) => {
    const updated = saveCustomerSession({ name, phone });
    setCustomerSession(updated);
    setIsCustomerModalOpen(false);

    // Show overlay for 2s, user must manually spin afterwards
    showRoundOverlay(1);
  };

  // Reset session for a new customer
  const handleResetForNewCustomer = () => {
    if (customerSession) {
      saveToWinnersHistory(customerSession);
    }
    clearCustomerSession();
    setCustomerSession(null);
    setIsGrandModalOpen(false);
    setSelectedPrize(null);
    setWinningIndex(null);
    setPrizes([...CASH_PRIZES].sort(() => Math.random() - 0.5));

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

      {/* Top Left Spin Counter */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-6 z-40 bg-white/90 border-2 border-slate-200 shadow-md rounded-full px-5 py-2.5 flex items-center gap-2 backdrop-blur-sm">
        <Users className="w-5 h-5 text-slate-600" />
        <span className="font-black text-slate-800 text-sm tracking-wider">
          Total Spins: <span className="text-red-600 ml-1 text-base">{spinCount}</span>
        </span>
      </div>

      {/* Top Right Floating CashPatti Link Button & Grand Celebration shortcut */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 z-40 flex items-center gap-2">
        {/* Round Indicator */}
        <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm tracking-wide border-2 border-white shadow-[0_8px_24px_rgba(234,88,12,0.45)] ring-2 ring-amber-400/80 flex items-center gap-2 backdrop-blur-sm">
          <span>{customerSession?.prize2 ? "Round 3: Bumper Prizes" : (customerSession?.prize1 ? "Round 2: Exciting Products" : "Round 1: Cash Prize")}</span>
        </div>

        {/* Grand Celebration shortcut button */}
        {customerSession?.prize1 && customerSession?.prize2 && customerSession?.prize3 && (
          <button
            onClick={() => setIsGrandModalOpen(true)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide border-2 border-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
            title="View prizes won"
          >
            <Trophy className="w-4 h-4 text-slate-900" />
            <span>View All 3 Prizes</span>
          </button>
        )}
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
          <FestiveBanner isRound1={!customerSession?.prize1} isRound2={!!customerSession?.prize1 && !customerSession?.prize2} isRound3={!!customerSession?.prize2} />

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
              <span>{isSpinning ? "Spinning..." : (customerSession?.prize2 ? "GO TO BUMPER ROUND" : (customerSession?.prize1 ? "SPIN ROUND 2" : "SPIN ROUND 1"))}</span>
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
        onClose={() => {
          setIsModalOpen(false);
          handleShuffle();
          
          const sess = getCustomerSession();
          if (sess?.prize2 && !sess?.prize3) {
            showRoundOverlay(3);
          } else if (sess?.prize1 && !sess?.prize2) {
            showRoundOverlay(2);
          }
        }}
        customerName={customerSession?.name}
        isRound1={!customerSession?.prize1}
        isRound2={!!customerSession?.prize1 && !customerSession?.prize2}
        isRound3={!!customerSession?.prize2}
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

      {/* Round Transition Overlay */}
      {roundOverlay !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="text-center transform animate-bounce-slow">
            {roundOverlay === 3 ? (
              <>
                <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-rose-500 to-amber-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] uppercase tracking-tighter filter drop-shadow-2xl">
                  Now Bumper Round
                </h1>
                <p className="text-3xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-widest uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-pulse">
                  Starts
                </p>
              </>
            ) : (
              <>
                <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] uppercase tracking-tighter filter drop-shadow-2xl">
                  Round {roundOverlay}
                </h1>
                <p className="text-3xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-widest uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-pulse">
                  Starts
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
