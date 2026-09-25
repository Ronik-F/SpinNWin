"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X, Package, ImageIcon, DollarSign, Type,
  CheckCircle2, AlertCircle, RotateCcw, Save,
  Tag as TagIcon, Sparkles, FileText, Globe, Bookmark,
} from "lucide-react";
import { INITIAL_PRIZES } from "../data/prizes";

// ─── Tiny Helpers ────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">
        <Icon size={12} className="text-emerald-400" />
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[10px] text-rose-400 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold placeholder:text-white/20 outline-none focus:border-emerald-500/60 focus:bg-white/10 transition-all shadow-inner"
      {...rest}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminProductPanel({ isOpen, onClose, prizes, onPrizesChange }) {
  // Which prize slot is being edited (0-11)
  const [selectedIdx, setSelectedIdx] = useState(0);
  // Working copy of all prizes
  const [draft, setDraft] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [saved, setSaved] = useState(false);
  const imgRef = useRef(null);

  // Sync draft when panel opens
  useEffect(() => {
    if (isOpen && prizes?.length) {
      setDraft(prizes.map((p) => ({ ...p })));
      setSelectedIdx(0);
      setSaved(false);
    }
  }, [isOpen, prizes]);

  if (!isOpen || !prizes?.length) return null;

  const current = draft[selectedIdx] ?? {};

  function updateField(field, value) {
    setDraft((prev) => {
      const next = [...prev];
      const updated = { ...next[selectedIdx], [field]: value };

      // Keep value string in sync when price changes
      if (field === "price") {
        const num = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
        if (!isNaN(num)) {
          updated.value = `Rs. ${num.toLocaleString()}`;
          updated.price = num;
        }
      }

      // Keep tag & badge synced
      if (field === "badge") {
        updated.tag = value;
      }
      if (field === "name") {
        updated.fullName = value;
      }
      if (field === "description") {
        updated.desc = value;
      }

      next[selectedIdx] = updated;
      return next;
    });
    setSaved(false);
    setImgError(false);
  }

  function handleResetSlot() {
    const orig = INITIAL_PRIZES[selectedIdx];
    if (!orig) return;
    setDraft((prev) => {
      const next = [...prev];
      next[selectedIdx] = { ...orig };
      return next;
    });
    setImgError(false);
    setSaved(false);
  }

  function handleSave() {
    onPrizesChange(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const previewImg = current.img || "";
  const currentBadge = current.badge || current.tag || "";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200 select-none">
      <div
        className="relative w-full max-w-3xl max-h-[94vh] flex flex-col rounded-3xl overflow-hidden border border-white/12 shadow-[0_0_100px_rgba(16,185,129,0.2)] animate-in zoom-in-95 duration-200"
        style={{ background: "linear-gradient(160deg, #0a0f1d 0%, #0d1e18 55%, #070c14 100%)" }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0"
          style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(245,158,11,0.1) 100%)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
              style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
            >
              <Package size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-base sm:text-lg tracking-tight">Product Editor</h2>
              <p className="text-white/45 text-[11px] font-medium mt-0.5">
                Admin · Edit slot name, price, tag/badge, description, and external image URL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 min-h-0">
          {/* Left: 12 Prize Slots Picker */}
          <div
            className="w-48 shrink-0 border-r border-white/8 overflow-y-auto py-2 bg-black/20"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
          >
            {draft.map((p, i) => {
              const isActive = i === selectedIdx;
              return (
                <button
                  key={p.id || i}
                  onClick={() => { setSelectedIdx(i); setImgError(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all cursor-pointer border-l-3 ${
                    isActive
                      ? "bg-emerald-500/15 border-emerald-400 text-white"
                      : "border-transparent text-white/45 hover:text-white/80 hover:bg-white/4"
                  }`}
                >
                  {/* Slot Number */}
                  <span className="text-[10px] font-mono font-bold text-white/30 w-3.5 shrink-0 text-center">
                    {i + 1}
                  </span>

                  {/* Mini Thumbnail */}
                  <div className="w-8 h-8 rounded-lg shrink-0 bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-contain p-0.5"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <Package size={13} className="text-white/20" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-black truncate leading-tight">{p.name || `Slot ${i + 1}`}</div>
                    <div className="text-[9.5px] text-emerald-400 font-bold mt-0.5">{p.value || "—"}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Form */}
          <div
            className="flex-1 min-w-0 overflow-y-auto px-6 py-5 space-y-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
          >
            {/* Live Visual Preview Card (Exactly how it appears in Winner Modal) */}
            <div
              className="relative w-full rounded-2xl border border-white/12 p-3.5 flex items-center gap-4 shadow-lg overflow-hidden"
              style={{ background: "radial-gradient(ellipse at top, rgba(16,185,129,0.12) 0%, rgba(0,0,0,0.5) 100%)" }}
            >
              {/* Product Image preview */}
              <div className="w-20 h-20 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 p-1 relative overflow-hidden">
                {previewImg && !imgError ? (
                  <img
                    ref={imgRef}
                    src={previewImg}
                    alt="preview"
                    className="w-full h-full object-contain drop-shadow"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-white/30 text-center">
                    <ImageIcon size={20} />
                    <span className="text-[9px]">No Image</span>
                  </div>
                )}
              </div>

              {/* Live Info Preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentBadge && (
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white text-[9.5px] font-black uppercase tracking-wider">
                      {currentBadge}
                    </span>
                  )}
                  {current.brand && (
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                      {current.brand}
                    </span>
                  )}
                </div>

                <div className="text-white text-sm font-black truncate mt-1">
                  {current.name || "Untitled Product"}
                </div>
                {current.nepaliName && (
                  <div className="text-red-400 text-xs font-bold truncate">
                    {current.nepaliName}
                  </div>
                )}
                <div className="text-white/45 text-[11px] line-clamp-1 mt-0.5">
                  {current.description || "No description provided"}
                </div>
              </div>

              {/* Price Plaque */}
              <div className="shrink-0 text-right">
                <span className="text-emerald-400 font-black text-sm block">
                  {current.value || (current.price ? `Rs. ${Number(current.price).toLocaleString()}` : "Rs. 0")}
                </span>
                <span className="text-[9px] text-white/30 font-semibold">Slot {selectedIdx + 1}</span>
              </div>
            </div>

            {/* ── Grid of Inputs ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Product Name */}
              <Field label="Product Name / Title" icon={Type}>
                <Input
                  value={current.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Soundpeats / QCY ANC Wireless Earbuds"
                />
              </Field>

              {/* Price (Rs) */}
              <Field label="Price (Rs.)" icon={DollarSign}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs font-bold pointer-events-none">
                    Rs.
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={current.price ?? ""}
                    onChange={(e) => updateField("price", e.target.value)}
                    placeholder="4200"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold placeholder:text-white/20 outline-none focus:border-emerald-500/60 focus:bg-white/10 transition-all"
                  />
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Highlight Tag / Badge */}
              <Field label="Highlight Tag / Badge" icon={Bookmark}>
                <Input
                  value={current.badge || current.tag || ""}
                  onChange={(e) => updateField("badge", e.target.value)}
                  placeholder="e.g. 🎧 LOW LATENCY, 🔥 HOT DEAL, 🏆 GRAND PRIZE"
                />
              </Field>

              {/* Brand Name */}
              <Field label="Brand" icon={TagIcon}>
                <Input
                  value={current.brand || ""}
                  onChange={(e) => updateField("brand", e.target.value)}
                  placeholder="e.g. SOUNDPEATS / QCY, HP, Redragon"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Nepali Subtitle / Name */}
              <Field label="Nepali Name / Category" icon={Globe}>
                <Input
                  value={current.nepaliName || ""}
                  onChange={(e) => updateField("nepaliName", e.target.value)}
                  placeholder="e.g. वायरलेस एयरबड्स, मेकानिकल किबोर्ड"
                />
              </Field>

              {/* Image URL */}
              <Field label="Image URL (Universal Link / Local)" icon={ImageIcon} error={imgError ? "Could not load this image" : null}>
                <Input
                  value={current.img || ""}
                  onChange={(e) => updateField("img", e.target.value)}
                  placeholder="https://... or /products/image.svg"
                />
              </Field>
            </div>

            {/* Description */}
            <Field label="Product Description & Features" icon={FileText}>
              <textarea
                value={current.description || current.desc || ""}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Active Noise Cancelling True Wireless Stereo Gaming Earbuds, 45ms Low Latency..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium placeholder:text-white/20 outline-none focus:border-emerald-500/60 focus:bg-white/10 transition-all resize-none shadow-inner"
              />
            </Field>

            {/* Hint Notice */}
            <div className="rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 text-[11px] text-white/35 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400 shrink-0" />
              <span>
                All changes (Name, Badge, Nepali Name, Description, Image, Price) reflect immediately in the Ferris Wheel, Catalog, and Winner Celebration Modal!
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-black/40"
        >
          <button
            onClick={handleResetSlot}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            Reset Slot to Default
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer shadow-md ${
                saved
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={14} /> Saved & Applied!
                </>
              ) : (
                <>
                  <Save size={13} /> Save All Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
