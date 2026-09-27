"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ResetPage() {
  const [message, setMessage] = useState("");

  const handleReset = () => {
    try {
      localStorage.setItem("alamtech_round1_spins", "0");
      localStorage.setItem("alamtech_round2_spins", "0");
      localStorage.setItem("bumper_spin_count", "0");
      
      setMessage("All spin counts have been successfully reset to 0.");
      
      // Clear the message after a few seconds
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      console.error("Error resetting spin counts:", err);
      setMessage("Failed to reset spin counts.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center font-sans select-none">
      <div className="max-w-md w-full bg-gradient-to-b from-[#1c122e] to-[#0c0617] border border-amber-500/30 rounded-3xl p-8 flex flex-col items-center shadow-2xl backdrop-blur-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4 shadow-inner">
          <RotateCcw className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-500 mb-2">
          Reset Spin Counters
        </h1>
        
        <p className="text-slate-400 mb-8 text-sm">
          Clicking the button below will reset the total number of spins for all rounds (Round 1, Round 2, and Bumper) back to zero.
        </p>

        <button
          onClick={handleReset}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-lg tracking-wide shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 mb-4 group"
        >
          <RotateCcw className="w-6 h-6 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Reset to Zero</span>
        </button>

        {message && (
          <div className="text-emerald-300 text-sm font-bold bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 rounded-lg w-full animate-in fade-in zoom-in duration-300">
            {message}
          </div>
        )}

        <div className="mt-6 w-full border-t border-white/10 pt-6">
          <Link
            href="/"
            className="text-slate-400 hover:text-amber-400 flex items-center justify-center gap-2 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
}
