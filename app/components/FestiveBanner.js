"use client";

import React from "react";

export default function FestiveBanner({ isRound1, isRound2, isRound3 }) {
  let subText = "Win Exciting Cash Prizes";
  if (isRound2) subText = "Win Exciting Products";
  if (isRound3) subText = "Win Bumper Prizes";

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&display=swap');
        .nepali-english-font {
          font-family: 'Yatra One', cursive;
        }
        .heavy-text-shadow-red {
          filter: drop-shadow(3px 3px 0px white) drop-shadow(-3px -3px 0px white) drop-shadow(3px -3px 0px white) drop-shadow(-3px 3px 0px white) drop-shadow(5px 5px 15px rgba(0,0,0,0.4));
        }
        .heavy-text-shadow-green {
          filter: drop-shadow(2px 2px 0px white) drop-shadow(-2px -2px 0px white) drop-shadow(2px -2px 0px white) drop-shadow(-2px 2px 0px white) drop-shadow(4px 4px 12px rgba(0,0,0,0.4));
        }
      `}} />
      <div className="relative select-none flex flex-col items-center justify-center text-center w-full max-w-[420px] -rotate-3 hover:-rotate-1 transition-transform duration-500 py-10 z-10">
        
        {/* Glow behind text to ensure readability over the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 blur-3xl rounded-full -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-400/30 blur-2xl rounded-full -z-10" />

        <h1 className="nepali-english-font text-6xl sm:text-7xl xl:text-[85px] font-normal leading-[0.85] text-red-700 heavy-text-shadow-red z-20">
          AlamTech<br/>
          <span className="text-red-600">Dashain</span><br/>
          Special
        </h1>
        
        <h2 className="nepali-english-font text-3xl sm:text-4xl xl:text-[45px] font-normal mt-6 text-emerald-600 leading-[1] heavy-text-shadow-green z-20">
          {subText}
        </h2>
      </div>
    </>
  );
}
