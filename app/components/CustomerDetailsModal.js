"use client";

import React, { useState } from "react";
import { User, Phone, Sparkles, X, Play, ShieldCheck } from "lucide-react";

export default function CustomerDetailsModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanName || cleanName.length < 2) {
      setError("कृपया आफ्नो पूरा नाम प्रविष्ट गर्नुहोस् (Please enter your name)");
      return;
    }
    if (!cleanPhone || cleanPhone.length < 7) {
      setError("कृपया सही फोन नम्बर प्रविष्ट गर्नुहोस् (Please enter a valid phone number)");
      return;
    }

    setError("");
    onSubmit({ name: cleanName, phone: cleanPhone });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md select-none"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      {/* Ambient Dashain Warm Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 158, 11, 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Main Card Container */}
      <div
        className="relative w-full max-w-[460px] overflow-hidden"
        style={{ animation: "popIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Outer Festive Golden Border */}
        <div
          className="absolute inset-0 rounded-[32px] p-[2.5px] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(135deg, #fde68a, #f59e0b, #ea580c, #dc2626, #fbbf24)",
          }}
        />

        {/* Card Body */}
        <div className="relative z-10 m-[2.5px] rounded-[30px] overflow-hidden bg-gradient-to-b from-[#181126] via-[#120b1e] to-[#0a0612] text-white p-5 sm:p-7 shadow-2xl border border-amber-500/20">
          {/* Top Tihar Hanging Lights Festoon */}
          <div className="absolute top-0 left-0 right-0 h-9 pointer-events-none overflow-hidden opacity-90 flex justify-around items-center px-4">
            <span className="w-2.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
            <span className="w-2.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="w-2.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" style={{ animationDelay: "0.8s" }} />
            <span className="w-2.5 h-3.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-2.5 h-3.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" style={{ animationDelay: "0.6s" }} />
            <span className="w-2.5 h-3.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#fde047] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Floating Dashain Diamond Kite 1 (Top-Left) */}
          <div className="absolute -top-3 -left-3 pointer-events-none opacity-85 rotate-[-18deg]">
            <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-red-500 rotate-45 border border-white/60 shadow-lg" />
            <svg className="w-5 h-8 -mt-1 ml-4" viewBox="0 0 20 35">
              <path d="M4,0 Q12,10 5,20 T8,35" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </div>

          {/* Floating Dashain Diamond Kite 2 (Top-Right) */}
          <div className="absolute -top-2 -right-2 pointer-events-none opacity-85 rotate-[15deg]">
            <div className="relative w-9 h-9 bg-gradient-to-br from-sky-400 to-indigo-600 rotate-45 border border-white/60 shadow-lg" />
            <svg className="w-4 h-7 -mt-1 ml-3" viewBox="0 0 20 30">
              <path d="M4,0 Q10,8 4,18 T7,30" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Title Section */}
          <div className="text-center pt-3 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-bold text-[11px] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>दशैं तथा तिहार विशेष उपहार योजना</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-tight leading-snug">
              ग्राहक विवरण प्रविष्ट गर्नुहोस्
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/80 mt-1 max-w-[340px] mx-auto">
              आफ्नो नाम र फोन नम्बर राखी पाङ्ग्रा घुमाउनुहोस् र <strong className="text-amber-300 font-bold">२ वटै उपहार</strong> जित्नुहोस्!
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 px-3.5 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold text-center animate-shake">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Field 1: Customer Name */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-amber-200/90 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>तपाईंको शुभ नाम (Customer Name)</span>
                <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="उदा: Alamtech"
                  autoFocus
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-amber-400/40 focus:border-amber-300 text-white placeholder-slate-400 text-sm font-semibold outline-none transition-all shadow-inner focus:ring-2 focus:ring-amber-400/40"
                />
              </div>
            </div>

            {/* Field 2: Phone Number */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-amber-200/90 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>मोबाइल नम्बर (Phone Number)</span>
                <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="उदा: 9745256574"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-amber-400/40 focus:border-amber-300 text-white placeholder-slate-400 text-sm font-semibold outline-none transition-all shadow-inner focus:ring-2 focus:ring-amber-400/40"
                />
              </div>
            </div>

            {/* Dashain & Tihar Feature Note */}
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 flex items-center gap-2.5 text-[11px] text-amber-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                पाङ्ग्रामा पहिलो उपहार जितेपछि स्वतः क्यास पत्तीमा दोस्रो नगद उपहार जित्न जानुहुनेछ!
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-1 w-full py-3.5 px-6 rounded-2xl font-black text-base sm:text-lg text-white tracking-wide uppercase shadow-[0_10px_25px_rgba(234,88,12,0.45)] ring-2 ring-amber-400/80 transition-all active:scale-95 cursor-pointer relative overflow-hidden group flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />
              <Play className="w-5 h-5 fill-current" />
              <span>पाङ्ग्रा घुमाउनुहोस् (SPIN NOW)</span>
            </button>
          </form>

          {/* Decorative Diya Footer Accent */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <span>🪔</span>
            <span>AlamTech • दशैं तथा तिहार उपहार धमाका २०८१/८२</span>
            <span>🪔</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.85) translateY(20px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.35s ease-in-out; }
      `}</style>
    </div>
  );
}
