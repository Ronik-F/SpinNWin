"use client";
import React from "react";
import PlayingCard from "./PlayingCard";

export const PLAYER_NAMES = ["Ronik", "Rijan", "Rohan", "Dip", "Abhinav", "Sheela"];

// Custom avatars matching the reference poker style in Image 4
function PlayerAvatarSvg({ playerId, size = 56 }) {
  switch (playerId) {
    case 0:
      // Ronik: Fedora hat, cool sunglasses, stylish jacket
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#1e1b4b" />
          <circle cx="50" cy="50" r="45" fill="#312e81" />
          <path d="M 22 95 C 22 75 32 70 50 70 C 68 70 78 75 78 95 Z" fill="#4338ca" />
          <path d="M 40 70 L 50 82 L 60 70 Z" fill="#f8fafc" />
          <path d="M 47 77 L 50 92 L 53 77 Z" fill="#ef4444" />
          <rect x="44" y="58" width="12" height="14" rx="2" fill="#e0a96d" />
          <ellipse cx="50" cy="46" rx="20" ry="22" fill="#f5c285" />
          <ellipse cx="50" cy="30" rx="34" ry="9" fill="#1e293b" />
          <path d="M 26 29 C 26 12 40 10 50 10 C 60 10 74 12 74 29 Z" fill="#0f172a" />
          <path d="M 28 27 Q 50 30 72 27 L 73 24 Q 50 27 27 24 Z" fill="#ef4444" />
          <path d="M 33 42 Q 41 40 48 43 L 48 48 Q 41 52 33 48 Z" fill="#09090b" stroke="#fbbf24" strokeWidth="1" />
          <path d="M 52 43 Q 59 40 67 42 L 67 48 Q 59 52 52 48 Z" fill="#09090b" stroke="#fbbf24" strokeWidth="1" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 44 56 Q 50 60 57 56" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 1:
      // Rijan: Sharp look with modern slick hair and aviator shades
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#450a0a" />
          <circle cx="50" cy="50" r="45" fill="#7f1d1d" />
          <path d="M 20 95 C 20 74 32 68 50 68 C 68 68 80 74 80 95 Z" fill="#991b1b" />
          <path d="M 42 68 L 50 82 L 58 68 Z" fill="#18181b" />
          <rect x="44" y="56" width="12" height="14" rx="2" fill="#d97706" />
          <ellipse cx="50" cy="45" rx="19" ry="21" fill="#fbbd68" />
          <path d="M 28 40 C 28 20 40 16 50 16 C 60 16 72 20 72 40 C 65 30 55 26 45 28 C 38 29 32 34 28 40 Z" fill="#1c1917" />
          <ellipse cx="40" cy="42" rx="8" ry="7" fill="#0369a1" opacity="0.9" stroke="#f8fafc" strokeWidth="1" />
          <ellipse cx="60" cy="42" rx="8" ry="7" fill="#0369a1" opacity="0.9" stroke="#f8fafc" strokeWidth="1" />
          <line x1="48" y1="40" x2="52" y2="40" stroke="#f8fafc" strokeWidth="1.5" />
          <path d="M 43 56 Q 50 61 57 56" fill="none" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 2:
      // Rohan: Handsome player with trim beard and blazer
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#082f49" />
          <circle cx="50" cy="50" r="45" fill="#0369a1" />
          <path d="M 20 95 C 20 74 32 68 50 68 C 68 68 80 74 80 95 Z" fill="#0f172a" />
          <path d="M 41 68 L 50 82 L 59 68 Z" fill="#f8fafc" />
          <polygon points="48,72 52,72 51,88 49,88" fill="#dc2626" />
          <rect x="44" y="56" width="12" height="14" rx="2" fill="#e0a96d" />
          <ellipse cx="50" cy="45" rx="19" ry="21" fill="#f5c285" />
          <path d="M 29 40 C 29 22 40 18 50 18 C 60 18 71 22 71 40 C 65 28 55 24 45 26 C 37 28 32 33 29 40 Z" fill="#292524" />
          <ellipse cx="40" cy="40" rx="3" ry="2" fill="#1c1917" />
          <ellipse cx="60" cy="40" rx="3" ry="2" fill="#1c1917" />
          <path d="M 33 46 C 33 62 44 65 50 65 C 56 65 67 62 67 46 C 63 56 57 58 50 58 C 43 58 37 56 33 46 Z" fill="#1c1917" opacity="0.8" />
          <path d="M 44 53 Q 50 56 56 53" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 3:
      // Dip: Festive Nepali Dhaka Topi & warm smile
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#064e3b" />
          <circle cx="50" cy="50" r="45" fill="#047857" />
          <path d="M 22 95 C 22 75 32 70 50 70 C 68 70 78 75 78 95 Z" fill="#d97706" />
          <path d="M 46 70 L 54 70 L 50 84 Z" fill="#fbbf24" />
          <rect x="44" y="58" width="12" height="14" rx="2" fill="#d97706" />
          <ellipse cx="50" cy="47" rx="19" ry="21" fill="#fbbd68" />
          <polygon points="26,35 48,15 74,32 72,37 28,37" fill="#b91c1c" />
          <polygon points="32,35 48,20 64,33 60,37 36,37" fill="#15803d" />
          <polygon points="38,35 48,25 58,34" fill="#fbbf24" />
          <rect x="25" y="35" width="50" height="4" fill="#7f1d1d" />
          <circle cx="41" cy="45" r="2.5" fill="#1c1917" />
          <circle cx="59" cy="45" r="2.5" fill="#1c1917" />
          <circle cx="50" cy="38" r="2.5" fill="#dc2626" />
          <path d="M 42 56 Q 50 63 58 56" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 4:
      // Abhinav: Tech gamer with stylish glasses & hoodie
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#713f12" />
          <circle cx="50" cy="50" r="45" fill="#b45309" />
          <path d="M 20 95 C 20 74 30 68 50 68 C 70 68 80 74 80 95 Z" fill="#0f766e" />
          <circle cx="50" cy="85" r="6" fill="#14b8a6" />
          <rect x="44" y="56" width="12" height="14" rx="2" fill="#e0a96d" />
          <ellipse cx="50" cy="45" rx="19" ry="21" fill="#f5c285" />
          <circle cx="34" cy="27" r="9" fill="#1c1917" />
          <circle cx="44" cy="22" r="10" fill="#1c1917" />
          <circle cx="56" cy="22" r="10" fill="#1c1917" />
          <circle cx="66" cy="27" r="9" fill="#1c1917" />
          <rect x="33" y="38" width="14" height="11" rx="3" fill="none" stroke="#f8fafc" strokeWidth="2" />
          <rect x="53" y="38" width="14" height="11" rx="3" fill="none" stroke="#f8fafc" strokeWidth="2" />
          <line x1="47" y1="43" x2="53" y2="43" stroke="#f8fafc" strokeWidth="2" />
          <circle cx="40" cy="43.5" r="2.2" fill="#0f172a" />
          <circle cx="60" cy="43.5" r="2.2" fill="#0f172a" />
          <path d="M 44 57 Q 50 62 57 58" fill="none" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 5:
    default:
      // Sheela: Stylish woman with hoop earrings & flowing hair
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#831843" />
          <circle cx="50" cy="50" r="45" fill="#be185d" />
          <path d="M 22 95 C 22 75 32 70 50 70 C 68 70 78 75 78 95 Z" fill="#db2777" />
          <ellipse cx="50" cy="74" rx="14" ry="7" fill="#fbcfe8" />
          <ellipse cx="50" cy="52" rx="26" ry="26" fill="#18181b" />
          <rect x="44" y="58" width="12" height="14" rx="2" fill="#fbbd68" />
          <ellipse cx="50" cy="46" rx="18" ry="20" fill="#fcd34d" />
          <path d="M 28 36 C 28 18 40 16 50 16 C 60 16 72 18 72 36 C 68 28 58 24 50 24 C 42 24 32 28 28 36 Z" fill="#18181b" />
          <path d="M 26 36 Q 30 56 34 64 Q 30 48 30 36 Z" fill="#18181b" />
          <path d="M 74 36 Q 70 56 66 64 Q 70 48 70 36 Z" fill="#18181b" />
          <ellipse cx="28" cy="52" rx="2.5" ry="5" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
          <ellipse cx="72" cy="52" rx="2.5" ry="5" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
          <ellipse cx="41" cy="43" rx="3" ry="2" fill="#18181b" />
          <path d="M 37 41 Q 41 38 45 41" fill="none" stroke="#18181b" strokeWidth="1.5" />
          <ellipse cx="59" cy="43" rx="3" ry="2" fill="#18181b" />
          <path d="M 55 41 Q 59 38 63 41" fill="none" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 43 55 Q 50 61 57 55" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.2" />
        </svg>
      );
  }
}

const SEAT_GLOW_COLORS = [
  "#a855f7", // Ronik - Purple
  "#ef4444", // Rijan - Red
  "#3b82f6", // Rohan - Blue
  "#10b981", // Dip - Green
  "#f59e0b", // Abhinav - Amber
  "#ec4899", // Sheela - Pink
];

export default function PlayerSeat({
  playerId,
  isSelected,
  isSelectable,
  onSelect,
  cards = null,
  faceUp = false,
  handName = null,
  rank = null,
  isCustomerPlayer = false,
  revealDelay = 0,
  cardSpreadDirection = "inward",
}) {
  const name = PLAYER_NAMES[playerId];
  const isWinner = rank === 1;
  const glowColor = SEAT_GLOW_COLORS[playerId] || "#f59e0b";

  const getHandBadgeClass = (hName) => {
    if (!hName) return "";
    const lower = hName.toLowerCase();
    if (lower.includes("trail") || lower.includes("trio")) return "hand-trail";
    if (lower.includes("pure")) return "hand-pure-seq";
    if (lower.includes("seq")) return "hand-seq";
    if (lower.includes("color") || lower.includes("flush")) return "hand-color";
    if (lower.includes("pair")) return "hand-pair";
    return "hand-high";
  };

  return (
    <div
      className={`player-seat-station ${isSelected ? "seat-selected" : ""} ${
        isSelectable ? "seat-selectable" : ""
      } ${isCustomerPlayer ? "seat-customer" : ""}`}
      onClick={isSelectable ? onSelect : undefined}
    >
      {/* ============================================================== */}
      {/* 3 FANNED CARDS (Wider spread for maximum readability)          */}
      {/* ============================================================== */}
      <div className={`table-seat-cards spread-${cardSpreadDirection}`}>
        {[0, 1, 2].map((i) => {
          // Angle fan: -13deg, 0deg, +13deg with generous X-shift
          const rot = (i - 1) * 13;
          const shiftX = (i - 1) * 22;
          const shiftY = Math.abs(i - 1) * 4;

          return (
            <div
              key={i}
              className="card-fan-leaf"
              style={{
                transform: `translateX(${shiftX}px) translateY(${shiftY}px) rotate(${rot}deg)`,
                zIndex: i + 1,
              }}
            >
              <PlayingCard
                card={cards ? cards[i] : null}
                faceUp={faceUp}
                delay={revealDelay + i * 260}
              />
            </div>
          );
        })}

        {/* Hand Name Reveal Badge */}
        {handName && (
          <div
            className={`hand-result-badge ${getHandBadgeClass(handName)} ${
              isWinner ? "winner-glow" : ""
            }`}
          >
            {handName}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* PLAYER PROFILE MODULE (Avatar + Horizontal Capsule Plate)      */}
      {/* ============================================================== */}
      <div className="player-profile-anchor">
        {/* Floating Rank Badge */}
        {rank && (
          <div className={`seat-rank-pill rank-${rank}`}>
            {rank === 1
              ? "🏆 1st WINNER"
              : rank === 2
              ? "🥈 2nd"
              : rank === 3
              ? "🥉 3rd"
              : `${rank}th`}
          </div>
        )}

        {/* YOUR PICK Floating Tag */}
        {isSelected && !rank && (
          <div className="seat-yourpick-tag">★ YOUR PICK</div>
        )}

        <div className="player-profile-row">
          {/* Circular Illustrated Avatar with glowing rim */}
          <div
            className="player-avatar-circle"
            style={{
              borderColor: isSelected ? "#f59e0b" : glowColor,
              boxShadow: isSelected
                ? "0 0 18px rgba(245,158,11,0.9), 0 0 0 2px #fef08a"
                : `0 0 12px ${glowColor}66`,
            }}
          >
            <PlayerAvatarSvg playerId={playerId} size={54} />
          </div>

          {/* Connected Horizontal Capsule Plate */}
          <div
            className={`player-plate-pill ${
              isSelected ? "plate-highlighted" : ""
            }`}
          >
            <div className="plate-status-tag">
              {isSelected ? "ACTIVE" : "BLIND"}
            </div>
            <div className="plate-name-text">{name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
