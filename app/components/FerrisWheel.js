"use client";

import React, { useMemo } from "react";

export default function FerrisWheel({
  prizes = [],
  rotation = 0,
  swayAngle = 0,
  winningIndex = null,
  isSpinning = false,
  onSpinClick,
}) {
  // Wheel geometry scaled up to fill screen with massive cabins
  const cx = 540;
  const cy = 475;
  const outerRadius = 390;
  const innerRadius = 295;

  // 10 spokes for 10 cabins (36 deg intervals)
  const r4 = (n) => Math.round(n * 10000) / 10000;

  const spokes = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => {
      const angleDeg = i * 36; // 0 is top (12 o'clock), 180 is bottom (6 o'clock)
      const rad = (angleDeg * Math.PI) / 180;
      const xOuter = r4(cx + outerRadius * Math.sin(rad));
      const yOuter = r4(cy - outerRadius * Math.cos(rad));
      const xInner = r4(cx + innerRadius * Math.sin(rad));
      const yInner = r4(cy - innerRadius * Math.cos(rad));
      return { index: i, angleDeg, xOuter, yOuter, xInner, yInner };
    });
  }, [cx, cy, outerRadius, innerRadius]);

  // Structural trusses between concentric rims
  const trusses = useMemo(() => {
    return spokes.map((spoke, i) => {
      const nextSpoke = spokes[(i + 1) % 10];
      return {
        id: i,
        x1: spoke.xInner,
        y1: spoke.yInner,
        x2: nextSpoke.xOuter,
        y2: nextSpoke.yOuter,
      };
    });
  }, [spokes]);

  return (
    <div className="relative h-full max-h-[92vh] sm:max-h-[95vh] aspect-square select-none mx-auto drop-shadow-2xl flex items-center justify-center">
      <svg
        viewBox="0 0 1080 1080"
        className="h-full w-auto max-h-[92vh] sm:max-h-[95vh] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blue Frame Gradients */}
          <linearGradient id="legGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          <radialGradient id="centerHubGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>

          <radialGradient id="pedestalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="goldBeam" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#fef08a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          <filter id="cabinShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.32" />
          </filter>

          <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================= A-FRAME STAND ================= */}
        <g id="stand">
          {/* Base Ground Shadow */}
          <ellipse cx="540" cy="1035" rx="420" ry="24" fill="#0f172a" opacity="0.22" />

          {/* Left Leg */}
          <polygon
            points="526,475 210,1030 268,1030 554,475"
            fill="url(#legGrad)"
            stroke="#172554"
            strokeWidth="3.5"
          />

          {/* Right Leg */}
          <polygon
            points="554,475 870,1030 812,1030 526,475"
            fill="url(#legGrad)"
            stroke="#172554"
            strokeWidth="3.5"
          />

          {/* Cross Tie Beams */}
          <line x1="360" y1="740" x2="720" y2="740" stroke="#1e3a8a" strokeWidth="15" strokeLinecap="round" />
          <line x1="290" y1="900" x2="790" y2="900" stroke="#1e40af" strokeWidth="16" strokeLinecap="round" />

          {/* Heavy Steel Foot Pads */}
          <rect x="190" y="1018" width="100" height="22" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
          <rect x="790" y="1018" width="100" height="22" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
          {/* Rivets */}
          <circle cx="210" cy="1029" r="3.5" fill="#94a3b8" />
          <circle cx="270" cy="1029" r="3.5" fill="#94a3b8" />
          <circle cx="810" cy="1029" r="3.5" fill="#94a3b8" />
          <circle cx="870" cy="1029" r="3.5" fill="#94a3b8" />
        </g>

        {/* ================= BOTTOM WINNER PEDESTAL (6 O'CLOCK) ================= */}
        <g id="winner-pedestal">
          {/* Spotlight Upward Cone */}
          <polygon
            points="480,1010 600,1010 660,740 420,740"
            fill="url(#goldBeam)"
            className={isSpinning ? "opacity-30" : "animate-spotlight-rays"}
          />

          {/* Glowing Radial Aura */}
          <circle
            cx="540"
            cy="995"
            r="105"
            fill="url(#pedestalGlow)"
            className={!isSpinning && winningIndex !== null ? "animate-pulse-glow" : ""}
          />

          {/* Multi-tier Golden Pedestal Base */}
          <ellipse cx="540" cy="1000" rx="100" ry="28" fill="#78350f" opacity="0.6" />
          <ellipse cx="540" cy="992" rx="94" ry="26" fill="#b45309" stroke="#f59e0b" strokeWidth="4" />
          <ellipse cx="540" cy="985" rx="80" ry="20" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
          <ellipse cx="540" cy="980" rx="62" ry="14" fill="#fef08a" />

          {/* Perimeter LED Bulbs */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const bx = 540 + 86 * Math.cos(angle);
            const by = 992 + 22 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={bx}
                cy={by}
                r="5"
                fill={i % 2 === 0 ? "#fef08a" : "#ef4444"}
                stroke="#b45309"
                strokeWidth="1.5"
                className="animate-pulse"
              />
            );
          })}

          {/* Golden Arrow pointing up to the 6 o'clock cabin */}
          <polygon
            points="540,925 522,965 558,965"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="3.5"
            filter="url(#goldGlow)"
          />

          {/* Winner Zone Tag */}
          <g transform="translate(540, 1038)">
            <rect
              x="-90"
              y="-14"
              width="180"
              height="30"
              rx="15"
              fill="#b45309"
              stroke="#fbbf24"
              strokeWidth="2.5"
              filter="url(#cabinShadow)"
            />
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="900"
              letterSpacing="1.2"
            >
              ★ WINNER SPOT ★
            </text>
          </g>
        </g>

        {/* ================= REVOLVING WHEEL ASSEMBLY ================= */}
        <g id="revolving-wheel" transform={`rotate(${rotation}, ${cx}, ${cy})`}>
          {/* Outer Main Rim */}
          <circle
            cx={cx}
            cy={cy}
            r={outerRadius}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="14"
          />
          <circle
            cx={cx}
            cy={cy}
            r={outerRadius - 3}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3.5"
            opacity="0.9"
          />

          {/* 20 Sparkling Festival LED Bulbs along Outer Rim (every 18 deg) */}
          {Array.from({ length: 20 }).map((_, i) => {
            const a = (i * 18 * Math.PI) / 180;
            const bx = r4(cx + (outerRadius + 3) * Math.sin(a));
            const by = r4(cy - (outerRadius + 3) * Math.cos(a));
            return (
              <circle
                key={`rim-bulb-${i}`}
                cx={bx}
                cy={by}
                r="4.2"
                fill={i % 3 === 0 ? "#fef08a" : i % 3 === 1 ? "#f59e0b" : "#ef4444"}
                stroke="#ca8a04"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Inner Rim */}
          <circle
            cx={cx}
            cy={cy}
            r={innerRadius}
            fill="none"
            stroke="#2563eb"
            strokeWidth="9"
          />

          {/* Structural Cross Trusses */}
          {trusses.map((truss) => (
            <line
              key={truss.id}
              x1={truss.x1}
              y1={truss.y1}
              x2={truss.x2}
              y2={truss.y2}
              stroke="#60a5fa"
              strokeWidth="3.5"
              opacity="0.8"
            />
          ))}

          {/* 10 Tubular Spokes */}
          {spokes.map((spoke) => (
            <g key={`spoke-${spoke.index}`}>
              <line
                x1={cx}
                y1={cy}
                x2={spoke.xOuter}
                y2={spoke.yOuter}
                stroke="#1e40af"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <line
                x1={cx}
                y1={cy}
                x2={spoke.xOuter}
                y2={spoke.yOuter}
                stroke="#93c5fd"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle
                cx={spoke.xOuter}
                cy={spoke.yOuter}
                r="8"
                fill="#1e3a8a"
                stroke="#60a5fa"
                strokeWidth="3"
              />
            </g>
          ))}

          {/* 10 GIGANTIC CABINS (144px x 124px) - COUNTER-ROTATED TO STAY UPRIGHT */}
          {spokes.map((spoke) => {
            const prize = prizes[spoke.index] || {
              name: `Prize ${spoke.index + 1}`,
              nepaliName: "पुरस्कार",
              cabinColor: "#ef4444",
              borderColor: "#b91c1c",
              img: "/products/headphone.svg",
            };

            const isWinnerCabin = !isSpinning && winningIndex === spoke.index;

            return (
              <g
                key={`cabin-${spoke.index}`}
                transform={`translate(${spoke.xOuter}, ${spoke.yOuter}) rotate(${-rotation + swayAngle})`}
                filter="url(#cabinShadow)"
                className="cursor-pointer"
              >
                {/* Heavy Steel Hanger Bracket */}
                <path
                  d="M 0 -8 L -18 18 L 18 18 Z"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <circle cx="0" cy="-6" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />

                {/* Cabin Outer Shell - Extra Large (144x124) */}
                <rect
                  x="-72"
                  y="16"
                  width="144"
                  height="124"
                  rx="26"
                  fill={prize.cabinColor || "#ef4444"}
                  stroke={isWinnerCabin ? "#facc15" : (prize.borderColor || "#0f172a")}
                  strokeWidth={isWinnerCabin ? "6" : "3.5"}
                />

                {/* Top Roof Accent Strip */}
                <rect x="-52" y="21" width="104" height="5" rx="2.5" fill="#ffffff" opacity="0.55" />

                {/* Large Bright Viewing Window (128x100) */}
                <rect
                  x="-64"
                  y="28"
                  width="128"
                  height="100"
                  rx="20"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="2.5"
                />

                {/* Massive Product Image (116px x 92px) - Clearly visible from across the room! */}
                {prize.img && (
                  <foreignObject x="-58" y="30" width="116" height="92">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prize.img}
                      alt={prize.name || "prize"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.18))",
                      }}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </foreignObject>
                )}

                {/* Golden Price Tag Badge at Top of Cabin */}
                {prize.value && (
                  <g>
                    <rect
                      x="-46"
                      y="8"
                      width="92"
                      height="18"
                      rx="9"
                      fill="#fef08a"
                      stroke="#ca8a04"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="20.5"
                      textAnchor="middle"
                      fill="#854d0e"
                      fontSize="10"
                      fontWeight="900"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {prize.value}
                    </text>
                  </g>
                )}

                {/* High-Contrast Bold Prize Name Label */}
                <rect
                  x="-64"
                  y="114"
                  width="128"
                  height="24"
                  rx="12"
                  fill="#0f172a"
                  opacity="0.95"
                />
                <text
                  x="0"
                  y="130"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="900"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  {prize.name && prize.name.length > 16 ? prize.name.slice(0, 15) + "…" : prize.name}
                </text>

                {/* Pulsing Highlight if Winner */}
                {isWinnerCabin && (
                  <rect
                    x="-80"
                    y="10"
                    width="160"
                    height="138"
                    rx="30"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="6"
                    filter="url(#goldGlow)"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* ================= CENTER HUB WITH INTERACTIVE ARCADE BUTTON ================= */}
        <g
          id="center-hub-button"
          className="cursor-pointer group"
          onClick={onSpinClick}
          transform={`translate(${cx}, ${cy})`}
        >
          {/* Shadow */}
          <circle cx="0" cy="5" r="68" fill="#0f172a" opacity="0.45" />

          {/* Outer Gold Flange */}
          <circle
            cx="0"
            cy="0"
            r="65"
            fill="url(#centerHubGrad)"
            stroke="#fef08a"
            strokeWidth="4.5"
            filter="url(#cabinShadow)"
          />

          {/* Inner Crimson Button */}
          <circle
            cx="0"
            cy="0"
            r="52"
            fill="#b91c1c"
            stroke="#ef4444"
            strokeWidth="3.5"
            className="group-hover:fill-red-600 transition-colors"
          />

          {/* Center Play Icon & Spin Text */}
          <polygon
            points="-8,-16 16,0 -8,16"
            fill="#ffffff"
            filter="url(#goldGlow)"
          />
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8.5"
            fontWeight="900"
            letterSpacing="1"
          >
            ALAM TECH
          </text>
          <text
            x="0"
            y="35"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="11"
            fontWeight="900"
            letterSpacing="0.8"
          >
            {isSpinning ? "SPINNING" : "SPIN"}
          </text>
        </g>
      </svg>
    </div>
  );
}
