"use client";
import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

/**
 * Clean & High-Impact PrizeReveal Component
 * - Directly awards the prize corresponding to the player's finish position
 * - 6th place (40% odds): "Better Luck Next Time"
 * - 5th place (30% odds): Rs. 200 Cash
 * - 4th place (22% odds): Rs. 500 Cash
 * - 3rd place (6% odds): Rs. 1,000 Cash
 * - 2nd place (2% odds): Rs. 5,000 Cash
 * - 1st place (0% odds): Rs. 25,000 Cash
 */
export default function PrizeReveal({
  playerRank,
  prizeResult,
  playerName,
  onPlayAgain,
}) {
  const [count, setCount] = useState(0);
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

  const isWinner = prizeResult?.won && prizeResult?.prizeValue > 0;

  useEffect(() => {
    if (isWinner && !confettiFired.current) {
      confettiFired.current = true;
      const isGrand = prizeResult.prizeValue >= 5000;
      if (isGrand) {
        confetti({
          particleCount: 220,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#a855f7"],
        });
        setTimeout(
          () =>
            confetti({
              particleCount: 120,
              angle: 60,
              spread: 70,
              origin: { x: 0 },
              colors: ["#f59e0b", "#fde68a"],
            }),
          300
        );
        setTimeout(
          () =>
            confetti({
              particleCount: 120,
              angle: 120,
              spread: 70,
              origin: { x: 1 },
              colors: ["#f59e0b", "#fde68a"],
            }),
          500
        );
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#ef4444", "#22c55e"],
        });
      }
    }
  }, [isWinner, prizeResult]);

  // Animated prize counter for winners
  useEffect(() => {
    if (!isWinner) return;
    const target = prizeResult.prizeValue;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isWinner, prizeResult]);

  return (
    <div className="prize-reveal-overlay">
      <div className="prize-reveal-card">
        {/* Top Header Tag */}
        <div className="prize-modal-tag">CASHPATTI RESULT</div>

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
                {prizeResult.rankLabel} Reward Claimed!
              </div>
            </div>
          ) : (
            <div className="prize-result consolation">
              <div className="prize-consolation-label">
                Better luck next time!
              </div>
              <div className="prize-consolation-value">
                No prize won this round.
              </div>
              <div className="prize-consolation-sub">
                Try picking another player for a winning hand!
              </div>
            </div>
          )}
        </div>

        {/* Play Again Button */}
        <button className="play-again-btn" onClick={onPlayAgain}>
          ▶ PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
