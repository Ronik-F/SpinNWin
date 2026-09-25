"use client";

import React from "react";

/**
 * Authentic Traditional Nepali Dashain Swing (बाँसको लिङ्गे पिङ)
 * Based on authentic Nepali festival art with 4 curved bamboo stalks,
 * foliage crests, apex rope bindings, and a joyous swinger soaring high!
 */
export default function LingePing({ className = "", animated = true }) {
  return (
    <svg
      viewBox="0 0 500 560"
      className={`select-none pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Bamboo Gradient */}
        <linearGradient id="bambooStem" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Rope Binding Color */}
        <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* Birds Soaring in the Autumn Sky (चराहरू) */}
      <g className="animate-bird-glide opacity-70" fill="#0f172a">
        {/* Bird 1 */}
        <path d="M 50 70 Q 62 60 72 70 Q 82 60 94 70 Q 82 65 72 74 Q 62 65 50 70 Z" />
        {/* Bird 2 */}
        <path d="M 95 110 Q 104 102 112 110 Q 120 102 129 110 Q 120 106 112 113 Q 104 106 95 110 Z" />
        {/* Bird 3 */}
        <path d="M 140 85 Q 148 78 156 85 Q 164 78 172 85 Q 164 82 156 88 Q 148 82 140 85 Z" />
      </g>

      {/* 4 Majestic Bamboo Stalks (बाँसका चार लिंगा) */}
      <g stroke="#0f172a" strokeLinecap="round" fill="none">
        {/* Left Pole 1 (Back outer) */}
        <path
          d="M 130 560 Q 190 320 250 145 Q 210 75 160 20"
          strokeWidth="7"
          stroke="url(#bambooStem)"
        />
        {/* Left Pole 2 (Inner) */}
        <path
          d="M 180 560 Q 215 320 250 145 Q 230 80 205 32"
          strokeWidth="6"
          stroke="url(#bambooStem)"
        />

        {/* Right Pole 1 (Inner) */}
        <path
          d="M 320 560 Q 285 320 250 145 Q 270 80 295 32"
          strokeWidth="6"
          stroke="url(#bambooStem)"
        />
        {/* Right Pole 2 (Back outer) */}
        <path
          d="M 370 560 Q 310 320 250 145 Q 290 75 340 20"
          strokeWidth="7"
          stroke="url(#bambooStem)"
        />

        {/* Bamboo Node Markings (गाँठहरू) */}
        <g stroke="#334155" strokeWidth="2.5" opacity="0.6">
          <line x1="140" y1="500" x2="149" y2="498" />
          <line x1="155" y1="420" x2="164" y2="418" />
          <line x1="175" y1="340" x2="184" y2="338" />
          <line x1="202" y1="250" x2="210" y2="248" />

          <line x1="360" y1="500" x2="351" y2="498" />
          <line x1="345" y1="420" x2="336" y2="418" />
          <line x1="325" y1="340" x2="316" y2="338" />
          <line x1="298" y1="250" x2="290" y2="248" />
        </g>
      </g>

      {/* Wild Foliage Tops (बाँसको टुप्पा र बाबियोको बुजो) */}
      <g stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none">
        {/* Left Foliage Fronds */}
        <path d="M 160 20 Q 140 10 130 5" />
        <path d="M 165 24 Q 148 18 138 18" />
        <path d="M 170 30 Q 150 28 142 32" />
        <path d="M 175 36 Q 158 38 150 45" />
        <path d="M 180 44 Q 165 48 160 58" />
        <path d="M 185 54 Q 172 60 170 70" />
        {/* Fine grass leaves */}
        <path d="M 162 18 Q 150 6 142 2" strokeWidth="1.8" />
        <path d="M 172 26 Q 162 12 155 8" strokeWidth="1.8" />
        <path d="M 182 38 Q 172 26 168 22" strokeWidth="1.8" />

        {/* Right Foliage Fronds */}
        <path d="M 340 20 Q 360 10 370 5" />
        <path d="M 335 24 Q 352 18 362 18" />
        <path d="M 330 30 Q 350 28 358 32" />
        <path d="M 325 36 Q 342 38 350 45" />
        <path d="M 320 44 Q 335 48 340 58" />
        <path d="M 315 54 Q 328 60 330 70" />
        {/* Fine grass leaves */}
        <path d="M 338 18 Q 350 6 358 2" strokeWidth="1.8" />
        <path d="M 328 26 Q 338 12 345 8" strokeWidth="1.8" />
        <path d="M 318 38 Q 328 26 332 22" strokeWidth="1.8" />
      </g>

      {/* Apex Binding Crossbars & Hemp Rope Wrapping (बाबियोको दाम्लो) */}
      <g>
        {/* Horizontal Wooden Crossbeam */}
        <rect
          x="220"
          y="138"
          width="60"
          height="14"
          rx="3"
          fill="#334155"
          stroke="#0f172a"
          strokeWidth="2"
        />
        {/* Hemp Rope Wraps */}
        <ellipse cx="250" cy="145" rx="20" ry="10" fill="url(#ropeGrad)" stroke="#451a03" strokeWidth="1.5" />
        <line x1="234" y1="140" x2="266" y2="150" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
        <line x1="234" y1="148" x2="266" y2="138" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Animated Swing Group (पिङको लठ्ठो र मच्चिंदै उडेको मानिस) */}
      <g
        className={animated ? "animate-ping-swing" : ""}
        style={{ transformOrigin: "250px 145px" }}
      >
        {/* Hemp Swing Ropes (बाक्लो बाबियोको डोरी) */}
        <line
          x1="248"
          y1="148"
          x2="108"
          y2="378"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="252"
          y1="148"
          x2="128"
          y2="368"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Rope Texture / Twist Effect */}
        <line
          x1="248"
          y1="148"
          x2="108"
          y2="378"
          stroke="#f59e0b"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.5"
        />

        {/* Wooden Seat (पिर्का) */}
        <polygon points="98,382 134,366 138,374 102,390" fill="#78350f" stroke="#0f172a" strokeWidth="2" />

        {/* Person Flying High on the Swing (पिङमा मच्चिंदै रमाएको मानिस) */}
        <g fill="#0f172a">
          {/* Head */}
          <circle cx="114" cy="346" r="10" />

          {/* Torso leaning back in flight */}
          <path d="M 110 354 Q 106 368 116 376 L 102 384 Q 94 366 102 354 Z" />

          {/* Left Arm holding front rope */}
          <path
            d="M 108 358 Q 98 364 108 376"
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Arm holding rear rope */}
          <path
            d="M 116 358 Q 124 358 128 368"
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Legs pointing forward high into the breeze */}
          <path
            d="M 102 384 Q 85 392 72 388 Q 66 384 70 380 Q 82 382 96 378 Z"
          />
          <path
            d="M 106 386 Q 90 398 78 396 Q 74 392 78 388 Q 88 389 100 380 Z"
          />
        </g>
      </g>
    </svg>
  );
}
