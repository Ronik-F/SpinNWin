"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export default function VisitStorePage() {
  const containerRef = useRef(null);
  const [btnCoords, setBtnCoords] = useState(null);

  // Exact aspect ratios of the raw graphics:
  // Desktop (HeroEnhanced.png: 3340 x 1880)
  // Mobile (Heromobile.png: 1880 x 3344)
  const DESKTOP_ASPECT = 3340 / 1880;
  const MOBILE_ASPECT = 1880 / 3344;

  const updateButtonPosition = useCallback(() => {
    if (!containerRef.current) return;
    const W = containerRef.current.clientWidth;
    const H = containerRef.current.clientHeight;
    if (!W || !H) return;

    const screenAspect = W / H;
    const isMobilePortrait = screenAspect < 1 || W <= 768;

    let imgW, imgH, leftOffset, topOffset;
    let bLeftPct, bTopPct, bWidthPct, bHeightPct;

    if (isMobilePortrait) {
      // Heromobile.png (1880 x 3344)
      if (screenAspect > MOBILE_ASPECT) {
        imgW = W;
        imgH = W / MOBILE_ASPECT;
        leftOffset = 0;
        topOffset = (H - imgH) / 2;
      } else {
        imgH = H;
        imgW = H * MOBILE_ASPECT;
        leftOffset = (W - imgW) / 2;
        topOffset = 0;
      }
      // Exact button bounding percentages in Heromobile.png
      bLeftPct = 0.266;
      bTopPct = 0.552;
      bWidthPct = 0.468;
      bHeightPct = 0.046;
    } else {
      // HeroEnhanced.png (3340 x 1880)
      if (screenAspect > DESKTOP_ASPECT) {
        imgW = W;
        imgH = W / DESKTOP_ASPECT;
        leftOffset = 0;
        topOffset = (H - imgH) / 2;
      } else {
        imgH = H;
        imgW = H * DESKTOP_ASPECT;
        leftOffset = (W - imgW) / 2;
        topOffset = 0;
      }
      // Exact button bounding percentages in HeroEnhanced.png
      bLeftPct = 0.117;
      bTopPct = 0.729;
      bWidthPct = 0.237;
      bHeightPct = 0.064;
    }

    setBtnCoords({
      left: Math.round(leftOffset + bLeftPct * imgW),
      top: Math.round(topOffset + bTopPct * imgH),
      width: Math.round(bWidthPct * imgW),
      height: Math.round(bHeightPct * imgH),
    });
  }, [DESKTOP_ASPECT, MOBILE_ASPECT]);

  useEffect(() => {
    updateButtonPosition();
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      updateButtonPosition();
    });
    ro.observe(container);

    window.addEventListener("resize", updateButtonPosition);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateButtonPosition);
    };
  }, [updateButtonPosition]);

  const handleRedirect = () => {
    window.location.href = "https://alamtech.com.np";
  };

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-[100dvh] overflow-hidden bg-[#070b16] select-none flex items-center justify-center"
    >
      {/* ── FULL SCREEN COVER HERO BANNER (LOSSLESS ORIGINAL PNG) ── */}
      <picture className="w-full h-full block pointer-events-none">
        {/* Mobile & Portrait Screen View (1880x3344 Lossless PNG) */}
        <source
          media="(max-aspect-ratio: 1/1), (max-width: 768px), (orientation: portrait)"
          srcSet="/Heromobile.png"
        />

        {/* Desktop & Landscape Screen View (3340x1880 Lossless PNG) */}
        <source
          media="(min-aspect-ratio: 1/1) and (orientation: landscape)"
          srcSet="/HeroEnhanced.png"
        />

        {/* Uncompressed original static image */}
        <img
          src="/HeroEnhanced.png"
          alt="Alam Tech Dashain & Tihar Special - Visit the Store & Spin the Wheel!"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          onLoad={updateButtonPosition}
          className="w-full h-full object-cover object-center"
          style={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />
      </picture>

      {/* ── RESPONSIVE INTERACTIVE "VISIT OUR STORE" BUTTON ONLY ── */}
      {btnCoords && (
        <a
          href="https://alamtech.com.np"
          onClick={(e) => {
            if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              handleRedirect();
            }
          }}
          style={{
            position: "absolute",
            left: `${btnCoords.left}px`,
            top: `${btnCoords.top}px`,
            width: `${btnCoords.width}px`,
            height: `${btnCoords.height}px`,
          }}
          className="group cursor-pointer rounded-full transition-all duration-200 hover:ring-4 hover:ring-amber-400/80 hover:bg-amber-400/10 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-amber-400 z-30"
          aria-label="Visit Our Store at alamtech.com.np"
          title="Visit Alam Tech Store (alamtech.com.np)"
        >
          {/* Subtle shimmer highlight on hover */}
          <div className="w-full h-full rounded-full overflow-hidden relative pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </div>
        </a>
      )}
    </main>
  );
}
