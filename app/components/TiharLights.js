"use client";

import React from "react";

/**
 * Authentic Nepali Tihar / Deepawali Multicolour Festoon Wire Lights (तिहारको झिलिमिली बत्ती माला)
 * Draped gracefully across the top with glowing multicolour teardrop bulbs and twinkle animations.
 */
export default function TiharLights({ className = "" }) {
  // 5 curved draping scallops across the screen
  const wires = [
    { d: "M 0,12 Q 150,55 300,14", bulbs: [
      { x: 30, y: 22, color: "#ef4444", delay: 0 },
      { x: 75, y: 35, color: "#f59e0b", delay: 1 },
      { x: 125, y: 44, color: "#10b981", delay: 0 },
      { x: 175, y: 44, color: "#3b82f6", delay: 1 },
      { x: 225, y: 35, color: "#ec4899", delay: 0 },
      { x: 270, y: 22, color: "#facc15", delay: 1 },
    ]},
    { d: "M 300,14 Q 450,58 600,12", bulbs: [
      { x: 335, y: 24, color: "#10b981", delay: 0 },
      { x: 380, y: 38, color: "#ef4444", delay: 1 },
      { x: 430, y: 46, color: "#8b5cf6", delay: 0 },
      { x: 475, y: 46, color: "#f59e0b", delay: 1 },
      { x: 525, y: 38, color: "#06b6d4", delay: 0 },
      { x: 570, y: 24, color: "#f43f5e", delay: 1 },
    ]},
    { d: "M 600,12 Q 750,58 900,14", bulbs: [
      { x: 635, y: 24, color: "#f59e0b", delay: 0 },
      { x: 680, y: 38, color: "#10b981", delay: 1 },
      { x: 730, y: 46, color: "#ef4444", delay: 0 },
      { x: 775, y: 46, color: "#3b82f6", delay: 1 },
      { x: 825, y: 38, color: "#facc15", delay: 0 },
      { x: 870, y: 24, color: "#d946ef", delay: 1 },
    ]},
    { d: "M 900,14 Q 1050,55 1200,12", bulbs: [
      { x: 935, y: 22, color: "#10b981", delay: 1 },
      { x: 980, y: 35, color: "#ef4444", delay: 0 },
      { x: 1030, y: 44, color: "#f59e0b", delay: 1 },
      { x: 1075, y: 44, color: "#8b5cf6", delay: 0 },
      { x: 1125, y: 35, color: "#06b6d4", delay: 1 },
      { x: 1170, y: 22, color: "#facc15", delay: 0 },
    ]},
    { d: "M 1200,12 Q 1330,52 1440,15", bulbs: [
      { x: 1235, y: 22, color: "#f43f5e", delay: 0 },
      { x: 1280, y: 34, color: "#10b981", delay: 1 },
      { x: 1330, y: 41, color: "#f59e0b", delay: 0 },
      { x: 1380, y: 34, color: "#3b82f6", delay: 1 },
      { x: 1420, y: 20, color: "#ec4899", delay: 0 },
    ]},
  ];

  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1440 68"
        className="w-full h-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Black/Dark Green Twisted Wire String */}
        {wires.map((wire, idx) => (
          <path
            key={`wire-${idx}`}
            d={wire.d}
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}

        {/* Glow Bulbs */}
        {wires.map((wire) =>
          wire.bulbs.map((bulb, bIdx) => {
            const isAlt = bulb.delay === 1;
            return (
              <g
                key={`b-${bulb.x}-${bIdx}`}
                className={isAlt ? "animate-tihar-2" : "animate-tihar-1"}
                style={{ color: bulb.color }}
              >
                {/* Socket cap */}
                <rect
                  x={bulb.x - 2}
                  y={bulb.y - 3}
                  width="4"
                  height="4"
                  rx="1"
                  fill="#0f172a"
                />

                {/* Soft ambient light halo */}
                <circle
                  cx={bulb.x}
                  cy={bulb.y + 6}
                  r="10"
                  fill={bulb.color}
                  opacity="0.32"
                  filter="url(#bulbGlow)"
                />

                {/* Glowing Glass Bulb Body */}
                <ellipse
                  cx={bulb.x}
                  cy={bulb.y + 6}
                  rx="4.5"
                  ry="6.5"
                  fill={bulb.color}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />

                {/* Inner white filament hotspot */}
                <ellipse
                  cx={bulb.x - 1}
                  cy={bulb.y + 4.5}
                  rx="1.2"
                  ry="2"
                  fill="#ffffff"
                  opacity="0.85"
                />
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}
