"use client";

import React from "react";

/**
 * Authentic Nepali Rs. 1000 Banknote (नेपाली रु. १००० को वास्तविक नोट)
 * Supports both:
 * 1. FRONT SIDE (`side="front"`):
 *    - Mount Everest (सगरमाथा) pyramid in carved Newari arch
 *    - Watermark oval, red "श्री नेपाल राष्ट्र बैंक" & "रुपैयाँ एक हजार"
 *    - Three tactile braille dots, Rhododendron (लालीगुराँस) bloom, and serial numbers
 * 2. BACK / REVERSE SIDE (`side="back"`):
 *    - Twin Asian Elephants (दुईवटा जंगली हात्ती - राम र लक्ष्मण) in the savanna
 *    - Top banner: "NEPAL RASTRA BANK" in red cartouche ribbon
 *    - Right text: "RUPEES ONE THOUSAND"
 *    - Left: Large scalloped lace watermark oval
 *    - Right edge: Carved ancient stone architectural column
 *    - Bottom-center: "2019 A.D."
 *    - Bottom-left & bottom-right: Bold white "1000" on engraved rosettes
 *    - Bottom-right: Circular Nepal Rastra Bank seal
 */
export default function NepaliCashNote({
  side = "front",
  className = "",
  style = {},
  width = 96,
  height = 44,
}) {
  if (side === "back") {
    return (
      <svg
        viewBox="0 0 220 100"
        width={width}
        height={height}
        className={`drop-shadow-md select-none ${className}`}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic Warm Parchment Paper */}
          <linearGradient id="nprPaperBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faf5e6" />
            <stop offset="40%" stopColor="#f5edd4" />
            <stop offset="75%" stopColor="#f8f2de" />
            <stop offset="100%" stopColor="#f2e9cb" />
          </linearGradient>

          {/* Grassland / Savanna Gradient */}
          <linearGradient id="grassland" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8eedd" />
            <stop offset="40%" stopColor="#dce7ce" />
            <stop offset="100%" stopColor="#c5d8b2" />
          </linearGradient>

          {/* Elephant Skin Slate-Teal Gradient */}
          <linearGradient id="elephantSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475f63" />
            <stop offset="50%" stopColor="#31484c" />
            <stop offset="100%" stopColor="#22373a" />
          </linearGradient>

          {/* Red Cartouche Mesh */}
          <linearGradient id="redCartouche" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a83225" />
            <stop offset="50%" stopColor="#c74132" />
            <stop offset="100%" stopColor="#a83225" />
          </linearGradient>
        </defs>

        {/* 1. Main Banknote Body (Warm Vintage Ivory) */}
        <rect
          x="1"
          y="1"
          width="218"
          height="98"
          rx="2.5"
          fill="url(#nprPaperBack)"
          stroke="#234a4e"
          strokeWidth="1.2"
        />

        {/* 2. Slate-Teal Outer Guilloche Border */}
        <rect
          x="3.5"
          y="3.5"
          width="213"
          height="93"
          rx="2"
          fill="none"
          stroke="#234a4e"
          strokeWidth="0.8"
        />
        <rect
          x="5.5"
          y="5.5"
          width="209"
          height="89"
          rx="1.5"
          fill="none"
          stroke="#2b595e"
          strokeWidth="0.4"
          strokeDasharray="2 1"
          opacity="0.8"
        />

        {/* Top Scalloped Frieze Pattern across the top border */}
        <g fill="#234a4e" opacity="0.85">
          {Array.from({ length: 22 }).map((_, i) => (
            <path
              key={i}
              d={`M ${75 + i * 6} 4 Q ${78 + i * 6} 8 ${81 + i * 6} 4 Z`}
            />
          ))}
        </g>

        {/* ============================================================== */}
        {/* 3. LEFT SECTION: LARGE WATERMARK OVAL WITH SCALLOPED LACE */}
        {/* ============================================================== */}
        <g transform="translate(36, 44)">
          {/* Outer Scalloped Floral Lace Frame */}
          <path
            d="M 0 -36 C -18 -36 -28 -20 -28 0 C -28 20 -18 36 0 36 C 18 36 28 20 28 0 C 28 -20 18 -36 0 -36 Z"
            fill="none"
            stroke="#234a4e"
            strokeWidth="1.2"
          />
          {/* Decorative Scallops along the outer rim */}
          <ellipse cx="0" cy="0" rx="26" ry="34" fill="none" stroke="#234a4e" strokeWidth="0.5" strokeDasharray="2.5 1.5" opacity="0.75" />
          {/* Blank Ivory Watermark Window */}
          <ellipse cx="0" cy="0" rx="23" ry="31" fill="#fbf7ec" />

          {/* Multi-pointed Engraved Corner Star on Top-Left */}
          <g transform="translate(-23, -32)" fill="#234a4e">
            <polygon points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" />
          </g>
        </g>

        {/* Bottom-Left Engraved Rosette with White "1000" */}
        <g transform="translate(26, 84)">
          {/* Dark Slate-Teal Rosette Shell */}
          <rect x="-18" y="-9" width="36" height="17" rx="3" fill="#234a4e" stroke="#163134" strokeWidth="0.8" />
          {/* White English 1000 */}
          <text
            x="0"
            y="4.5"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#ffffff"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.5"
          >
            1000
          </text>
        </g>

        {/* ============================================================== */}
        {/* 4. TOP CENTER: "NEPAL RASTRA BANK" RED CARTOUCHE RIBBON */}
        {/* ============================================================== */}
        <g transform="translate(112, 14)">
          {/* Trapezoidal Decorative Cartouche Banner */}
          <polygon
            points="-52,-7 52,-7 46,7 -46,7"
            fill="url(#redCartouche)"
            stroke="#234a4e"
            strokeWidth="0.9"
          />
          {/* Inner White Border */}
          <polygon
            points="-50,-5.5 50,-5.5 44.5,5.5 -44.5,5.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.6"
            opacity="0.85"
          />
          {/* English Header: NEPAL RASTRA BANK */}
          <text
            x="0"
            y="2.8"
            textAnchor="middle"
            fontSize="7"
            fontWeight="900"
            fill="#ffffff"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.8"
          >
            NEPAL RASTRA BANK
          </text>
        </g>

        {/* ============================================================== */}
        {/* 5. CENTER: TWIN ELEPHANTS IN THE GRASSLAND (राम र लक्ष्मण) */}
        {/* ============================================================== */}
        {/* Savanna Grassland Ground */}
        <rect x="68" y="24" width="134" height="66" fill="url(#grassland)" opacity="0.35" />
        <path
          d="M 68 76 Q 100 72 135 74 Q 170 76 202 74 L 202 88 L 68 88 Z"
          fill="#c9d9ba"
          opacity="0.65"
        />

        {/* Detailed Engraved Twin Elephants Group */}
        <g transform="translate(100, 32)">
          {/* --- LEFT ELEPHANT (Smaller companion) --- */}
          <g>
            {/* Body Bulk */}
            <path
              d="M -14 36 Q -18 20 -10 12 Q 2 6 12 12 L 14 36 Z"
              fill="url(#elephantSkin)"
            />
            {/* Head Dome & Ear */}
            <circle cx="-4" cy="14" r="8" fill="url(#elephantSkin)" />
            <path
              d="M -10 12 Q -16 18 -10 24 Q -6 20 -6 14 Z"
              fill="#22373a"
              stroke="#1a2d30"
              strokeWidth="0.4"
            />
            {/* Trunk */}
            <path
              d="M -2 18 Q -3 28 -1 36 Q 2 40 4 36 Q 2 28 3 20 Z"
              fill="url(#elephantSkin)"
              stroke="#162729"
              strokeWidth="0.5"
            />
            {/* Tusks */}
            <path d="M 0 24 L 2 30 L 4 25 Z" fill="#ffffff" />
            {/* Legs */}
            <rect x="-13" y="32" width="5.5" height="15" rx="1.5" fill="#22373a" />
            <rect x="-4" y="34" width="5.5" height="14" rx="1.5" fill="#31484c" />
            <rect x="7" y="32" width="5.5" height="15" rx="1.5" fill="#22373a" />
          </g>

          {/* --- RIGHT ELEPHANT (Dominant Tusker) --- */}
          <g transform="translate(18, -2)">
            {/* Massive Body Bulk */}
            <path
              d="M -16 38 Q -20 18 -10 8 Q 8 2 20 8 Q 28 18 26 38 Z"
              fill="url(#elephantSkin)"
            />
            {/* Head Domes */}
            <circle cx="2" cy="11" r="10" fill="url(#elephantSkin)" />
            {/* Flapping Ears (Left & Right) */}
            <path
              d="M -8 8 Q -16 16 -8 26 Q -4 20 -4 12 Z"
              fill="#22373a"
              stroke="#1a2d30"
              strokeWidth="0.5"
            />
            <path
              d="M 12 8 Q 20 16 14 26 Q 10 20 8 12 Z"
              fill="#22373a"
              stroke="#1a2d30"
              strokeWidth="0.5"
            />
            {/* Long Frontal Trunk */}
            <path
              d="M -1 16 Q -2 30 1 42 Q 4 45 6 42 Q 4 30 5 18 Z"
              fill="url(#elephantSkin)"
              stroke="#162729"
              strokeWidth="0.5"
            />
            {/* Skin wrinkle lines */}
            <line x1="0" y1="22" x2="4" y2="22" stroke="#162729" strokeWidth="0.4" />
            <line x1="0" y1="27" x2="4" y2="27" stroke="#162729" strokeWidth="0.4" />
            <line x1="1" y1="33" x2="5" y2="33" stroke="#162729" strokeWidth="0.4" />
            {/* Magnificent White Ivory Tusks */}
            <path d="M -3 21 Q -5 32 -7 34 Q -4 31 -1 25 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.3" />
            <path d="M 6 21 Q 8 32 10 34 Q 7 31 4 25 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.3" />
            {/* Sturdy Elephant Legs */}
            <rect x="-14" y="34" width="7" height="16" rx="2" fill="#22373a" />
            <rect x="-4" y="36" width="7" height="15" rx="2" fill="#31484c" />
            <rect x="7" y="36" width="7" height="15" rx="2" fill="#22373a" />
            <rect x="18" y="34" width="6.5" height="16" rx="2" fill="#31484c" />
          </g>

          {/* Grass Tufts at Elephant Feet */}
          <g stroke="#556b2f" strokeWidth="0.8" fill="none">
            <line x1="-16" y1="48" x2="-14" y2="44" />
            <line x1="-14" y1="48" x2="-12" y2="43" />
            <line x1="0" y1="49" x2="3" y2="45" />
            <line x1="12" y1="50" x2="10" y2="46" />
            <line x1="28" y1="49" x2="32" y2="44" />
            <line x1="38" y1="50" x2="36" y2="46" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* 6. RIGHT CENTER: BOLD ENGLISH "RUPEES ONE THOUSAND" */}
        {/* ============================================================== */}
        <g textAnchor="middle">
          {/* RUPEES */}
          <text
            x="162"
            y="43"
            fontSize="9"
            fontWeight="900"
            fill="#234a4e"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.4"
          >
            RUPEES
          </text>
          {/* ONE THOUSAND */}
          <text
            x="162"
            y="54"
            fontSize="9.5"
            fontWeight="900"
            fill="#234a4e"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.2"
          >
            ONE THOUSAND
          </text>
        </g>

        {/* ============================================================== */}
        {/* 7. BOTTOM RIGHT CENTER: CIRCULAR NEPAL RASTRA BANK SEAL */}
        {/* ============================================================== */}
        <g transform="translate(164, 80)">
          {/* Outer Coin Circle */}
          <circle cx="0" cy="0" r="14" fill="#faf6ea" stroke="#234a4e" strokeWidth="0.9" />
          <circle cx="0" cy="0" r="12.5" fill="none" stroke="#234a4e" strokeWidth="0.4" strokeDasharray="1.2 0.8" />
          {/* Inner Inscription Ring */}
          <text
            x="0"
            y="-4.5"
            textAnchor="middle"
            fontSize="3.2"
            fontWeight="bold"
            fill="#234a4e"
            fontFamily="system-ui, sans-serif"
          >
            नेपाल राष्ट्र बैंक
          </text>
          {/* Crossed Khukuris & Temple Motif */}
          <g stroke="#234a4e" strokeWidth="0.6" fill="none">
            <line x1="-5" y1="2" x2="5" y2="2" />
            <path d="M -4 4 L 4 -2" />
            <path d="M 4 4 L -4 -2" />
            <circle cx="0" cy="-0.5" r="1.5" fill="#234a4e" />
          </g>
          {/* Motto: असतोमा सद्गमय */}
          <text
            x="0"
            y="7.5"
            textAnchor="middle"
            fontSize="2.4"
            fill="#475569"
            fontFamily="system-ui, sans-serif"
          >
            असतोमा सद्गमय
          </text>
        </g>

        {/* ============================================================== */}
        {/* 8. RIGHT EDGE: ANCIENT CARVED ARCHITECTURAL COLUMN PILLAR */}
        {/* ============================================================== */}
        <g transform="translate(196, 18)">
          {/* Pillar Shaft Body */}
          <rect x="0" y="0" width="14" height="60" rx="1" fill="#faf5e6" stroke="#234a4e" strokeWidth="0.8" />
          {/* Capital at Top */}
          <rect x="-2" y="-2" width="18" height="4" rx="1" fill="#234a4e" />
          <line x1="-1" y1="2" x2="15" y2="2" stroke="#ffffff" strokeWidth="0.5" />
          {/* Fluted Column Slots / Bells */}
          {Array.from({ length: 7 }).map((_, idx) => (
            <rect
              key={idx}
              x="2.5"
              y={6 + idx * 7.2}
              width="9"
              height="4.5"
              rx="1.2"
              fill="#d9e4e6"
              stroke="#234a4e"
              strokeWidth="0.5"
            />
          ))}
          {/* Base Pedestal at Bottom */}
          <rect x="-2" y="58" width="18" height="4" rx="1" fill="#234a4e" />
        </g>

        {/* Bottom-Right Rosette with White "1000" */}
        <g transform="translate(198, 84)">
          {/* Crimson / Red Rosette Shell */}
          <rect x="-15" y="-9" width="30" height="17" rx="3" fill="#b83a2c" stroke="#8d261a" strokeWidth="0.8" />
          {/* White English 1000 */}
          <text
            x="0"
            y="4.5"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#ffffff"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.5"
          >
            1000
          </text>
        </g>

        {/* Bottom Center: Year "2019 A.D." */}
        <text
          x="110"
          y="93"
          textAnchor="middle"
          fontSize="4"
          fontWeight="bold"
          fill="#475569"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.6"
        >
          2019 A.D.
        </text>
      </svg>
    );
  }

  // ====================================================================
  // FRONT SIDE (सगरमाथा, श्री नेपाल राष्ट्र बैंक, लालीगुराँस)
  // ====================================================================
  return (
    <svg
      viewBox="0 0 220 100"
      width={width}
      height={height}
      className={`drop-shadow-md select-none ${className}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Authentic Warm Parchment/Ivory Paper Texture */}
        <linearGradient id="nprPaperBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faf5e6" />
          <stop offset="35%" stopColor="#f5edd4" />
          <stop offset="70%" stopColor="#f8f2de" />
          <stop offset="100%" stopColor="#f3ebcf" />
        </linearGradient>

        {/* Mountain Sky Tint */}
        <linearGradient id="everestSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fceee0" />
          <stop offset="100%" stopColor="#edd8c2" />
        </linearGradient>

        {/* Rhododendron Floral Tint */}
        <radialGradient id="rhododendronGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e57373" />
          <stop offset="65%" stopColor="#c94a4a" />
          <stop offset="100%" stopColor="#a33232" />
        </radialGradient>

        {/* Silver Security Metallic Thread */}
        <linearGradient id="silverStrip" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>

      {/* 1. Main Banknote Body (Warm Vintage Ivory) */}
      <rect
        x="1"
        y="1"
        width="218"
        height="98"
        rx="2.5"
        fill="url(#nprPaperBg)"
        stroke="#234a4e"
        strokeWidth="1.2"
      />

      {/* 2. Intricate Slate-Teal Outer Guilloche Border */}
      <rect
        x="3.5"
        y="3.5"
        width="213"
        height="93"
        rx="2"
        fill="none"
        stroke="#234a4e"
        strokeWidth="0.8"
      />
      <rect
        x="5.5"
        y="5.5"
        width="209"
        height="89"
        rx="1.5"
        fill="none"
        stroke="#2b595e"
        strokeWidth="0.4"
        strokeDasharray="2 1"
        opacity="0.8"
      />

      {/* Top Geometric Chevron Frieze (Zigzag Border across top-right) */}
      <g stroke="#234a4e" strokeWidth="0.7" fill="#d9e6e3" opacity="0.85">
        <polygon points="120,6 124,11 128,6 132,11 136,6 140,11 144,6 148,11 152,6 156,11 160,6 164,11 168,6 172,11 176,6 180,11 184,6 188,11 192,6 196,11 200,6 204,11 208,6 208,13 120,13" />
      </g>

      {/* ============================================================== */}
      {/* 3. LEFT SECTION: MOUNT EVEREST (सगरमाथा) IN CARVED TEMPLE ARCH */}
      {/* ============================================================== */}
      {/* Carved Wooden Pillar Frame on Left */}
      <rect x="7" y="7" width="60" height="74" rx="2" fill="url(#everestSky)" stroke="#234a4e" strokeWidth="0.9" />

      {/* Ornate Arch Top & Carved Wooden Lintel */}
      <path
        d="M 7 24 Q 37 10 67 24 L 67 7 L 7 7 Z"
        fill="#264e52"
        stroke="#1a373a"
        strokeWidth="0.6"
      />
      {/* Newari Carving Motif Accents */}
      <circle cx="37" cy="14" r="2.5" fill="#faf5e6" />
      <path d="M 12 12 Q 24 16 37 14 Q 50 16 62 12" stroke="#faf5e6" strokeWidth="0.6" fill="none" />

      {/* Mount Everest Silhouette & Ridges (सगरमाथा) */}
      <g>
        {/* Mountain Base Body (Deep slate-teal shadow) */}
        <polygon
          points="8,80 15,58 37,28 48,46 66,62 66,80"
          fill="#2b5055"
        />
        {/* Sunlit Snowy Summit Face (White snow ridges) */}
        <polygon points="37,28 34,42 42,48 48,46" fill="#ffffff" opacity="0.95" />
        <polygon points="37,28 27,48 34,54 34,42" fill="#e2edf0" opacity="0.9" />
        {/* Snow avalanche slope streaks */}
        <path d="M 37 28 L 24 64 L 32 68 L 42 48" fill="#ffffff" opacity="0.85" />
        <path d="M 28 54 L 18 78 L 28 80 L 36 68" fill="#e8f1f2" opacity="0.8" />
        <path d="M 42 48 L 56 68 L 66 72 L 66 62" fill="#ffffff" opacity="0.8" />
        <path d="M 48 46 L 52 56 L 46 62" fill="#c3d5d8" opacity="0.7" />
        {/* Rocky Outcrops & Texture */}
        <line x1="33" y1="36" x2="36" y2="40" stroke="#1d373a" strokeWidth="0.7" />
        <line x1="28" y1="46" x2="33" y2="50" stroke="#1d373a" strokeWidth="0.7" />
        <line x1="22" y1="58" x2="26" y2="64" stroke="#1d373a" strokeWidth="0.7" />
      </g>

      {/* ============================================================== */}
      {/* 4. WATERMARK OVAL */}
      {/* ============================================================== */}
      <g transform="translate(73, 58)">
        <ellipse cx="0" cy="0" rx="13" ry="19" fill="#faf6ea" stroke="#234a4e" strokeWidth="1.2" />
        <ellipse cx="0" cy="0" rx="11" ry="17" fill="none" stroke="#234a4e" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.75" />
        <path d="M -9 19 Q 0 25 9 19 L 7 24 L -7 24 Z" fill="#264e52" />
      </g>

      {/* Silver Metallic Security Thread */}
      <rect x="142" y="4" width="2" height="92" fill="url(#silverStrip)" opacity="0.7" />

      {/* ============================================================== */}
      {/* 5. CENTER INSCRIPTION */}
      {/* ============================================================== */}
      <g textAnchor="middle">
        <text
          x="110"
          y="23"
          fontSize="4.8"
          fill="#b83a2c"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
        >
          श्री
        </text>

        <text
          x="110"
          y="32"
          fontSize="8.5"
          fontWeight="900"
          fill="#b83a2c"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.2"
        >
          नेपाल राष्ट्र बैंक
        </text>

        <text x="110" y="38" fontSize="2.8" fill="#2b5055" fontFamily="system-ui, sans-serif">
          नेपाल सरकारको जमानत प्राप्त
        </text>
        <text x="110" y="42.5" fontSize="2.6" fill="#2b5055" fontFamily="system-ui, sans-serif">
          यसको रुपैयाँ भुक्तानी माग्न आएमा
        </text>
        <text x="110" y="47" fontSize="2.6" fill="#2b5055" fontFamily="system-ui, sans-serif">
          नेपाल राष्ट्र बैंकबाट रुपैयाँ १०००
        </text>

        <text
          x="110"
          y="58"
          fontSize="8.2"
          fontWeight="900"
          fill="#b83a2c"
          fontFamily="system-ui, sans-serif"
        >
          रुपैयाँ एक हजार
        </text>

        <text x="110" y="64" fontSize="2.8" fill="#2b5055" fontFamily="system-ui, sans-serif">
          तुरन्त पाइनेछ
        </text>

        <g stroke="#1e293b" strokeWidth="0.7" fill="none" opacity="0.85">
          <path d="M 96 73 Q 104 68 112 73 T 124 71 Q 128 73 132 71" />
          <path d="M 102 70 Q 106 75 110 70" />
        </g>
        <text x="110" y="79" fontSize="2.4" fill="#475569" fontFamily="system-ui, sans-serif">
          गभर्नर
        </text>
      </g>

      {/* Three Tactile Braille Dots (● ● ● for 1000) */}
      <g fill="#1e293b">
        <circle cx="150" cy="50" r="1.6" />
        <circle cx="150" cy="56.5" r="1.6" />
        <circle cx="150" cy="63" r="1.6" />
      </g>

      {/* ============================================================== */}
      {/* 6. RIGHT SECTION: NEWARI TEMPLE GATEWAY & RHODODENDRON */}
      {/* ============================================================== */}
      <g>
        <path
          d="M 158 80 L 158 26 Q 185 10 212 26 L 212 80 Z"
          fill="#faf6ea"
          stroke="#234a4e"
          strokeWidth="0.9"
        />
        <path
          d="M 158 26 Q 185 14 212 26"
          fill="none"
          stroke="#234a4e"
          strokeWidth="1.2"
        />
        <line x1="162" y1="28" x2="162" y2="78" stroke="#234a4e" strokeWidth="0.8" />
        <line x1="208" y1="28" x2="208" y2="78" stroke="#234a4e" strokeWidth="0.8" />

        <g transform="translate(185, 48)">
          <path
            d="M 0 -16 C -8 -16 -16 -10 -16 0 C -16 10 -8 16 0 16 C 8 16 16 10 16 0 C 16 -10 8 -16 0 -16 Z"
            fill="url(#rhododendronGrad)"
            opacity="0.85"
          />
          <circle cx="-6" cy="-6" r="5" fill="#c94a4a" />
          <circle cx="6" cy="-6" r="5" fill="#c94a4a" />
          <circle cx="-8" cy="4" r="5" fill="#c94a4a" />
          <circle cx="8" cy="4" r="5" fill="#c94a4a" />
          <circle cx="0" cy="8" r="5" fill="#c94a4a" />
          <circle cx="0" cy="-2" r="6" fill="#e57373" opacity="0.9" />
        </g>
      </g>

      {/* Top Right: Circular Nepal Rastra Bank Coin Emblem */}
      <g transform="translate(182, 16)">
        <circle cx="0" cy="0" r="8.5" fill="#234a4e" stroke="#b83a2c" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="7.2" fill="none" stroke="#faf5e6" strokeWidth="0.4" strokeDasharray="1 0.8" />
        <circle cx="0" cy="0" r="4.5" fill="#b83a2c" />
        <circle cx="0" cy="0" r="2" fill="#faf5e6" />
      </g>

      {/* Bottom Right: Red Rosette with Bold White "1000" */}
      <g transform="translate(196, 76)">
        <rect x="-12" y="-9" width="24" height="17" rx="3" fill="#b83a2c" stroke="#8d261a" strokeWidth="0.7" />
        <text
          x="0"
          y="3.5"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="900"
          fill="#ffffff"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-0.3"
        >
          1000
        </text>
      </g>

      <text
        x="180"
        y="77"
        textAnchor="end"
        fontSize="5"
        fontWeight="bold"
        fill="#1e293b"
        fontFamily="system-ui, sans-serif"
      >
        <tspan fontSize="3.8" fill="#475569">ख </tspan>३७६५६१
      </text>
      <text x="156" y="81" fontSize="3" fill="#475569" fontFamily="system-ui, sans-serif">
        ४१
      </text>

      {/* Bottom Left: Bold Red '१०००' & Serial Number */}
      <g transform="translate(8, 88)">
        <text
          x="0"
          y="0"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          <tspan fill="#b83a2c">१</tspan>
          <tspan fill="#2b5055">०००</tspan>
        </text>
      </g>

      <text
        x="48"
        y="86"
        fontSize="4.8"
        fontWeight="bold"
        fill="#1e293b"
        fontFamily="system-ui, sans-serif"
      >
        <tspan fontSize="3.6" fill="#475569">ख </tspan>३७६५६१
      </text>
      <text x="29" y="89" fontSize="2.8" fill="#475569" fontFamily="system-ui, sans-serif">
        ४१
      </text>
    </svg>
  );
}
