"use client";
import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { Sparkles, Trophy, ArrowRight, Clock } from "lucide-react";
import { getCustomerSession, saveCustomerSession } from "../../utils/session";

/**
 * Clean & High-Impact PrizeReveal Component with Homepage Celebration Redirect
 */
export default function PrizeReveal({
  playerRank,
  prizeResult,
  playerName,
  onPlayAgain,
}) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [countdown, setCountdown] = useState(4);
  const [session, setSession] = useState(null);
  const confettiFired = useRef(false);

  const rankLabels = {
    1: "1st Place 🏆",
    2: "2nd Place 🥈",
    3: "3rd Place 🥉",
    4: "4th Place",
    5: "5th Place",
    6: "6th Place",
  };
  const rankColors = {
    1: "linear-gradient(135deg, #f59e0b, #d97706)",
    2: "linear-gradient(135deg, #94a3b8, #64748b)",
    3: "linear-gradient(135deg, #b45309, #78350f)",
    4: "linear-gradient(135deg, #334155, #1e293b)",
    5: "linear-gradient(135deg, #1e293b, #0f172a)",
    6: "linear-gradient(135deg, #1e293b, #090d16)",
  };

  const isWinner = prizeResult?.won && prizeResult?.prizeValue > 0 && playerRank !== 6;
  const effectivePrizeValue = isWinner ? prizeResult.prizeValue : 0;
  const effectivePrizeLabel = isWinner ? `Rs. ${prizeResult.prizeValue.toLocaleString("en-NP")}` : "Better Luck Next Time";

  useEffect(() => {
    // Read and save prize2 into session
    const currentSession = getCustomerSession() || {};
    setSession(currentSession);

    const prize2Data = {
      rank: playerRank,
      rankLabel: prizeResult?.rankLabel || `${playerRank}th Place`,
      prizeValue: effectivePrizeValue,
      prizeLabel: effectivePrizeLabel,
      won: isWinner,
      cardPlayerName: playerName,
    };
    saveCustomerSession({ prize2: prize2Data });

    // 4-second countdown & clean auto-redirect back to homepage grand celebration
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push("/?celebrate=grand");
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [playerRank, prizeResult, playerName, isWinner, effectivePrizeValue, effectivePrizeLabel, router]);

  useEffect(() => {
    if (isWinner && !confettiFired.current) {
      confettiFired.current = true;
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#a855f7"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ["#f59e0b", "#fde68a"],
        });
      }, 300);
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ["#f59e0b", "#fde68a"],
        });
      }, 500);
    }
  }, [isWinner]);

  // Animated prize counter for winners
  useEffect(() => {
    if (!isWinner || effectivePrizeValue <= 0) return;
    const target = effectivePrizeValue;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isWinner, effectivePrizeValue]);

  const handleGoToCelebration = () => {
    router.push("/?celebrate=grand");
  };

  return (
    <div className="prize-reveal-overlay">
      <div className="prize-reveal-card" style={{ maxWidth: "480px" }}>
        {/* Top Header Tag */}
        <div className="prize-modal-tag flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>CASHPATTI SHOWDOWN RESULT • दोस्रो खेल</span>
        </div>

        {/* Customer greeting if present */}
        {session?.name && (
          <div className="text-amber-300 font-black text-sm tracking-wide mt-2">
            {isWinner ? `बधाई छ, ${session.name}!` : session.name}
          </div>
        )}

        {/* Player Name and Final Rank */}
        <div className="prize-player-name">{playerName}&apos;s Hand</div>
        <div
          className="prize-rank-badge"
          style={{ background: rankColors[playerRank] }}
        >
          {rankLabels[playerRank]}
        </div>

        {/* Result Area */}
        <div className="prize-rolling-stage">
          {isWinner ? (
            <div className="prize-result won">
              <div className="prize-won-label">🎊 CONGRATULATIONS!</div>
              <div className="prize-amount">
                <span className="prize-currency">Rs. </span>
                <span className="prize-number">
                  {count.toLocaleString("en-NP")}
                </span>
              </div>
              <div className="prize-type-label">
                {prizeResult?.rankLabel || `${playerRank}th Place`} Cash Reward Won!
              </div>
            </div>
          ) : (
            <div className="prize-result consolation py-4 px-2 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-200 mb-1">
                Better Luck Next Time!
              </div>
              <div className="text-xs text-slate-300">
                क्यास पत्तीमा यस पटक परेन, तर पाङ्ग्राको पहिलो उपहार सुरक्षित छ!
              </div>
            </div>
          )}
        </div>

        {/* Auto redirect banner */}
        <div className="mt-3.5 mb-2 p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-200 mb-1">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>
              {isWinner
                ? `दुवै उपहारको भव्य उत्सव हेर्न होमपेजमा जाँदैछ (${countdown}s)...`
                : `जितेको उपहार हेर्न होमपेजमा जाँदैछ (${countdown}s)...`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${(countdown / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* View Both Prizes / View Prize on Homepage Button */}
        <button
          className="w-full py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base text-white shadow-xl transition-all active:scale-95 cursor-pointer relative overflow-hidden group bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 border-2 border-white/30 flex items-center justify-center gap-2"
          onClick={handleGoToCelebration}
        >
          <Trophy className="w-5 h-5 text-amber-200" />
          <span>
            {isWinner
              ? "दुवै उपहार हेर्नुहोस् (VIEW BOTH PRIZES)"
              : "जितेको उपहार हेर्नुहोस् (VIEW YOUR PRIZE)"}
          </span>
          <ArrowRight className="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
