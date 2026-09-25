"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X, Package, ImageIcon, DollarSign, Type,
  CheckCircle2, AlertCircle, RotateCcw, Save,
} from "lucide-react";
import { INITIAL_PRIZES } from "../data/prizes";

// ─── tiny helpers ────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-white/40 uppercase tracking-wider mb-1.5">
        <Icon size={11} className="text-white/30" />
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[10px] text-rose-400 flex items-center gap-1">
          <AlertCircle size={9} /> {error}
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
      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white text-xs font-medium placeholder:text-white/20 outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
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
      next[selectedIdx] = { ...next[selectedIdx], [field]: value };
      // Keep value string in sync when price number changes
      if (field === "price") {
        const num = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
        if (!isNaN(num)) {
          next[selectedIdx].value = `Rs. ${num.toLocaleString()}`;
          next[selectedIdx].price = num;
        }
      }
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-lg">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.15)]"
        style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #0d1a14 60%, #0a0f1e 100%)" }}
      >

        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0"
          style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.12) 0%, rgba(59,130,246,0.07) 100%)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
            >
              <Package size={17} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-base tracking-tight">Product Editor</h2>
              <p className="text-white/40 text-[11px] font-medium mt-0.5">Admin · Edit wheel products</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 min-h-0">

          {/* Left: prize slot picker */}
          <div
            className="w-44 shrink-0 border-r border-white/6 overflow-y-auto py-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}
          >
            {draft.map((p, i) => {
              const isActive = i === selectedIdx;
              return (
                <button
                  key={p.id || i}
                  onClick={() => { setSelectedIdx(i); setImgError(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all cursor-pointer border-l-2 ${
                    isActive
                      ? "bg-white/6 border-emerald-500 text-white"
                      : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/3"
                  }`}
                >
                  {/* Mini thumbnail */}
                  <div className="w-8 h-8 rounded-lg shrink-0 bg-black/30 border border-white/8 flex items-center justify-center overflow-hidden">
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
                    <div className="text-[11px] font-bold truncate leading-tight">{p.name || `Slot ${i + 1}`}</div>
                    <div className="text-[9.5px] text-white/25 font-medium">{p.value || "—"}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: editor form */}
          <div className="flex-1 min-w-0 overflow-y-auto px-5 py-4 space-y-4"
               style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}>

            {/* Image preview card */}
            <div
              className="relative w-full rounded-xl border border-white/8 overflow-hidden flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.3)", minHeight: "130px" }}
            >
              {previewImg && !imgError ? (
                <img
                  ref={imgRef}
                  src={previewImg}
                  alt="preview"
                  className="max-h-28 object-contain p-3 drop-shadow-lg"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/15 py-6">
                  <ImageIcon size={32} strokeWidth={1} />
                  <span className="text-[11px] font-medium">
                    {imgError ? "Image failed to load" : "Paste an image URL below"}
                  </span>
                </div>
              )}

              {/* Colour accent dot */}
              <div
                className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full border-2 border-black/40"
                style={{ background: current.cabinColor || "#6b7280" }}
                title="Cabin colour (set in prizes.js)"
              />
            </div>

            {/* ── Fields ── */}
            <Field label="Image URL" icon={ImageIcon} error={imgError ? "Could not load this image" : null}>
              <Input
                value={current.img || ""}
                onChange={(e) => updateField("img", e.target.value)}
                placeholder="https://… or /products/image.png"
              />
              <p className="text-[10px] text-white/20 mt-1">
                Use an absolute URL or a path under <code className="text-white/35">/public/products/</code>
              </p>
            </Field>

            <Field label="Product Name" icon={Type}>
              <Input
                value={current.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. HP Notebook 15"
              />
            </Field>

            <Field label="Price (Rs.)" icon={DollarSign}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold pointer-events-none">
                  Rs.
                </span>
                <input
                  type="number"
                  min={0}
                  value={current.price || ""}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="99990"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white text-xs font-medium placeholder:text-white/20 outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                />
              </div>
              {current.value && (
                <p className="text-[10px] text-emerald-400/70 mt-1 font-mono">{current.value}</p>
              )}
            </Field>

            {/* Slot info hint */}
            <div className="rounded-xl border border-white/5 bg-white/2 px-3.5 py-2.5 text-[10.5px] text-white/25 leading-relaxed">
              Editing <span className="text-white/50 font-bold">Slot {selectedIdx + 1}</span> of 12.
              Changes apply to the wheel instantly after saving.
              Odds are recalculated automatically from the new price.
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 flex items-center justify-between gap-3 px-5 py-3.5 border-t border-white/8"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <button
            onClick={handleResetSlot}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white/30 hover:text-white/60 hover:bg-white/5 border border-white/6 hover:border-white/12 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            Reset Slot
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white/30 hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
                saved
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                  : "text-white border border-emerald-600/50 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              }`}
              style={saved ? {} : { background: "linear-gradient(135deg, #065f46, #059669)" }}
            >
              {saved ? <><CheckCircle2 size={13} /> Saved!</> : <><Save size={12} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
