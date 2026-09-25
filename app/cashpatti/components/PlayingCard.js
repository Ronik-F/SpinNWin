"use client";
import React from "react";

/**
 * High-Readability Casino PlayingCard Component
 * - Large, bold, high-contrast ranks and suit symbols
 * - Vivid red (#e11d48) and carbon black (#09090b)
 * - Rich casino red diamond-weave card back with AlamTech gold seal
 * - Crisp borders and 3D card flip animation
 */
export default function PlayingCard({
  card,
  faceUp = false,
  className = "",
  style = {},
  delay = 0,
}) {
  const isRed = card && (card.suit === "♥" || card.suit === "♦");
  const color = isRed ? "#e11d48" : "#09090b";

  return (
    <div
      className={`cashpatti-card-wrapper ${className}`}
      style={{ "--flip-delay": `${delay}ms`, ...style }}
    >
      <div className={`cashpatti-card-inner ${faceUp ? "flipped" : ""}`}>
        {/* ============================================================== */}
        {/* CARD BACK — Classic Casino Red Diamond Weave with Gold Emblem */}
        {/* ============================================================== */}
        <div className="cashpatti-card-face cashpatti-card-back">
          <svg
            viewBox="0 0 70 100"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <linearGradient id="cardBackRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="50%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>

              <pattern
                id="diamondWeave"
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 3.5 0 L 7 3.5 L 3.5 7 L 0 3.5 Z"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
                <circle cx="3.5" cy="3.5" r="0.8" fill="#fef08a" opacity="0.45" />
              </pattern>
            </defs>

            {/* Crisp white outer border */}
            <rect width="70" height="100" rx="5" fill="#f8fafc" />

            {/* Red diamond weave pattern */}
            <rect x="2.5" y="2.5" width="65" height="95" rx="3.5" fill="url(#cardBackRed)" />
            <rect x="2.5" y="2.5" width="65" height="95" rx="3.5" fill="url(#diamondWeave)" />

            {/* Inner gold frame line */}
            <rect
              x="4.5"
              y="4.5"
              width="61"
              height="91"
              rx="2.5"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="0.9"
              opacity="0.85"
            />

            {/* Center Oval Emblem */}
            <ellipse
              cx="35"
              cy="50"
              rx="15"
              ry="11"
              fill="#180b22"
              stroke="#fbbf24"
              strokeWidth="1.2"
            />
            <text
              x="35"
              y="53.5"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fontFamily="'Inter', sans-serif"
              fill="#fbbf24"
              letterSpacing="1"
            >
              AT
            </text>
          </svg>
        </div>

        {/* ============================================================== */}
        {/* CARD FACE — Large, Sharp, High-Visibility Casino Layout        */}
        {/* ============================================================== */}
        <div className="cashpatti-card-face cashpatti-card-front">
          <svg
            viewBox="0 0 70 100"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            {/* Pure white card stock */}
            <rect width="70" height="100" rx="5" fill="#ffffff" />
            <rect
              x="1"
              y="1"
              width="68"
              height="98"
              rx="4"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {card && (
              <>
                {/* ── Top-Left Rank & Suit ───────────────────────── */}
                <text
                  x="6"
                  y="18"
                  fontSize="17"
                  fontWeight="900"
                  fontFamily="'Inter', sans-serif"
                  fill={color}
                  letterSpacing="-0.5"
                >
                  {card.rank}
                </text>
                <text
                  x="6"
                  y="31"
                  fontSize="14"
                  fill={color}
                >
                  {card.suit}
                </text>

                {/* ── Big Centered Suit Symbol ───────────────────── */}
                <text
                  x="35"
                  y="64"
                  textAnchor="middle"
                  fontSize="42"
                  fill={color}
                  style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
                >
                  {card.suit}
                </text>

                {/* ── Bottom-Right Inverted Rank & Suit ──────────── */}
                <g
                  transform="rotate(180, 35, 50)"
                  style={{ transformOrigin: "center" }}
                >
                  <text
                    x="6"
                    y="18"
                    fontSize="17"
                    fontWeight="900"
                    fontFamily="'Inter', sans-serif"
                    fill={color}
                    letterSpacing="-0.5"
                  >
                    {card.rank}
                  </text>
                  <text
                    x="6"
                    y="31"
                    fontSize="14"
                    fill={color}
                  >
                    {card.suit}
                  </text>
                </g>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
