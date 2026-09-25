"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PlayerSeat, { PLAYER_NAMES } from "./components/PlayerSeat";
import PrizeReveal from "./components/PrizeReveal";
import TiharLights from "../components/TiharLights";
import NepaliCashNote from "../components/NepaliCashNote";
import { Play, Sparkles, ArrowLeft, Trophy, Shuffle, Zap } from "lucide-react";

// ─── Game Phases ──────────────────────────────────────────────────────────────
const PHASE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SELECTING: "SELECTING",
  LOCKING: "LOCKING",
  SHUFFLING: "SHUFFLING",
  DEALING: "DEALING",
  REVEALING: "REVEALING",
  RANKING: "RANKING",
  PRIZE: "PRIZE",
};

// Reveal order: selected player ALWAYS revealed last for peak suspense
function buildRevealOrder(selectedPlayerId) {
  const others = [0, 1, 2, 3, 4, 5].filter((id) => id !== selectedPlayerId);
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  return [...others, selectedPlayerId];
}

// Fixed stars configuration to prevent SSR hydration mismatches
const STATIC_STARS = [
  { left: 8, top: 12, size: 2, delay: 0.5 },
  { left: 18, top: 28, size: 1.5, delay: 1.8 },
  { left: 29, top: 8, size: 2.5, delay: 2.2 },
  { left: 42, top: 22, size: 1.2, delay: 0.9 },
  { left: 55, top: 14, size: 2, delay: 1.4 },
  { left: 68, top: 32, size: 1.8, delay: 2.7 },
  { left: 79, top: 11, size: 2.2, delay: 0.3 },
  { left: 91, top: 24, size: 1.5, delay: 1.9 },
  { left: 14, top: 48, size: 2, delay: 2.1 },
  { left: 86, top: 52, size: 2.5, delay: 1.1 },
  { left: 24, top: 68, size: 1.5, delay: 0.7 },
  { left: 74, top: 70, size: 2, delay: 2.4 },
  { left: 5, top: 82, size: 1.8, delay: 1.6 },
  { left: 94, top: 85, size: 2.2, delay: 0.8 },
  { left: 48, top: 88, size: 1.4, delay: 2.9 },
];

export default function CashPattiPage() {
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [sessionId, setSessionId] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [pendingPlayer, setPendingPlayer] = useState(null);
  const [revealData, setRevealData] = useState(null);
  const [revealedPlayers, setRevealedPlayers] = useState(new Set());
  const [ranksVisible, setRanksVisible] = useState(false);
  const [prizeResult, setPrizeResult] = useState(null);
  const [playerRank, setPlayerRank] = useState(null);
  const [error, setError] = useState(null);
  const [statusText, setStatusText] = useState("Pick One Player");

  const revealOrderRef = useRef([]);
  const animTimers = useRef([]);

  useEffect(() => {
    sessionStorage.removeItem("cashpatti_session");
  }, []);

  useEffect(() => () => animTimers.current.forEach(clearTimeout), []);

  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    animTimers.current.push(id);
    return id;
  };

  // ── Phase 1: Start Game ─────────────────────────────────────────────────────
  const handleStartGame = useCallback(async () => {
    setError(null);
    setPhase(PHASE.LOADING);
    setStatusText("Preparing Table...");

    try {
      const res = await fetch("/api/cashpatti/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "demo-user" }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSessionId(data.sessionId);
      sessionStorage.setItem("cashpatti_session", data.sessionId);
      setPhase(PHASE.SELECTING);
      setStatusText("Pick One Player");
    } catch (e) {
      setError(e.message);
      setPhase(PHASE.IDLE);
    }
  }, []);

  // ── Phase 2: Click Player ───────────────────────────────────────────────────
  const handlePlayerClick = useCallback(
    (playerId) => {
      if (phase !== PHASE.SELECTING) return;
      setPendingPlayer(playerId);
      setStatusText(`Selected ${PLAYER_NAMES[playerId]} — Confirm to lock`);
    },
    [phase]
  );

  // ── Phase 3: Confirm Player Selection & Start Shuffle Sequence ───────────────
  const handleConfirmSelection = useCallback(async () => {
    if (pendingPlayer === null || phase !== PHASE.SELECTING) return;
    setPhase(PHASE.LOCKING);
    setStatusText(`Locking in ${PLAYER_NAMES[pendingPlayer]}...`);

    try {
      const selRes = await fetch("/api/cashpatti/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, playerId: pendingPlayer }),
      });
      const selData = await selRes.json();
      if (selData.error) throw new Error(selData.error);

      const lockedPlayer = pendingPlayer;
      setSelectedPlayer(lockedPlayer);
      setPendingPlayer(null);

      // Fetch the true reveal data from server
      const revRes = await fetch("/api/cashpatti/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const revData = await revRes.json();
      if (revData.error) throw new Error(revData.error);

      setRevealData(revData);
      setPlayerRank(revData.playerRank);

      // ── Step 3a: AlamTech Shuffling Sequence in Middle (2.8 seconds)
      setPhase(PHASE.SHUFFLING);
      setStatusText("AlamTech is Shuffling Cards...");

      addTimer(() => {
        startDealingSequence(revData, lockedPlayer);
      }, 2800);
    } catch (e) {
      setError(e.message);
      setPhase(PHASE.SELECTING);
    }
  }, [pendingPlayer, phase, sessionId]);

  // ── Phase 4: Dealing & Sequential Reveal Sequence ───────────────────────────
  const startDealingSequence = useCallback(
    (data, lockedPlayer) => {
      setPhase(PHASE.DEALING);
      setStatusText("Dealing 3 Cards to Each Player...");

      const order = buildRevealOrder(lockedPlayer);
      revealOrderRef.current = order;
      setRevealedPlayers(new Set());
      setRanksVisible(false);

      // Deal phase lasts 2.2 seconds before reveal begins
      addTimer(() => {
        setPhase(PHASE.REVEALING);
        setStatusText("Revealing Hands...");

        // Each player reveals sequentially with deliberate suspense
        order.forEach((playerId, idx) => {
          const isLast = idx === order.length - 1;
          const baseDelay = 1600 + idx * 2200;

          addTimer(() => {
            setRevealedPlayers((prev) => new Set([...prev, playerId]));

            if (isLast) {
              setStatusText(`Revealing ${PLAYER_NAMES[lockedPlayer]}'s Cards!`);
            }
          }, baseDelay);
        });

        // ── Phase 5: SHOWCASING FINAL STANDINGS ON TABLE (5.5 Seconds) ────────
        // Give the user plenty of time to view their position & compare hands
        const rankDelay = 1600 + order.length * 2200 + 1400;
        addTimer(() => {
          setPhase(PHASE.RANKING);
          setRanksVisible(true);
          setStatusText(`Standings Revealed! ${PLAYER_NAMES[lockedPlayer]} placed #${data.playerRank}`);
        }, rankDelay);

        // ── Phase 6: Prize Reveal Modal (Triggers after 5.5s of table review) ──
        addTimer(async () => {
          try {
            const completeRes = await fetch("/api/cashpatti/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            });
            const completeData = await completeRes.json();
            if (completeData.error) throw new Error(completeData.error);
            setPrizeResult(completeData.prizeResult);
            sessionStorage.removeItem("cashpatti_session");
          } catch (e) {
            setError(e.message);
          }
          setPhase(PHASE.PRIZE);
          setStatusText("");
        }, rankDelay + 5500);
      }, 2200);
    },
    [sessionId]
  );

  // ── Reset Game ───────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];
    setPhase(PHASE.IDLE);
    setSessionId(null);
    setSelectedPlayer(null);
    setPendingPlayer(null);
    setRevealData(null);
    setRevealedPlayers(new Set());
    setRanksVisible(false);
    setPrizeResult(null);
    setPlayerRank(null);
    setError(null);
    setStatusText("Pick One Player");
    sessionStorage.removeItem("cashpatti_session");
  }, []);

  const getPlayerCards = (playerId) => {
    if (!revealData) return null;
    return revealData.hands.find((h) => h.playerId === playerId)?.cards ?? null;
  };
  const getPlayerHandName = (playerId) => {
    if (!revealData || !ranksVisible) return null;
    return revealData.hands.find((h) => h.playerId === playerId)?.handName ?? null;
  };
  const getPlayerRank = (playerId) => {
    if (!revealData || !ranksVisible) return null;
    return revealData.rankings.find((r) => r.playerId === playerId)?.rank ?? null;
  };

  const isSelecting = phase === PHASE.SELECTING;
  const hasRevealData = !!revealData;

  const seats = [
    { playerId: 0, posClass: "pos-left", spreadDir: "inward" },
    { playerId: 1, posClass: "pos-top-left", spreadDir: "down" },
    { playerId: 2, posClass: "pos-top-right", spreadDir: "down" },
    { playerId: 3, posClass: "pos-right", spreadDir: "inward" },
    { playerId: 4, posClass: "pos-bottom-right", spreadDir: "up" },
    { playerId: 5, posClass: "pos-bottom-left", spreadDir: "up" },
  ];

  return (
    <div className="cp-root">
      {/* Background Atmosphere */}
      <div className="cp-bg">
        <div className="cp-bg-gradient" />

        {/* Subtle Festival Bamboo Pole Silhouette */}
        <div className="cp-pole-bg">
          <svg
            viewBox="0 0 1440 600"
            className="w-full h-full opacity-20 pointer-events-none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 120 600 L 160 80 Q 150 40 130 10" stroke="#f59e0b" strokeWidth="4" fill="none" opacity="0.4" />
            <path d="M 140 600 L 170 80 Q 180 40 200 10" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.3" />
            <path d="M 1320 600 L 1280 80 Q 1290 40 1310 10" stroke="#f59e0b" strokeWidth="4" fill="none" opacity="0.4" />
            <path d="M 1300 600 L 1270 80 Q 1260 40 1240 10" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.3" />
            <path d="M 0 45 Q 720 180 1440 45" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" fill="none" opacity="0.25" />
          </svg>
        </div>

        {/* Ambient Stars Field */}
        <div className="cp-stars">
          {STATIC_STARS.map((s, i) => (
            <div
              key={i}
              className="cp-star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Multicolour Tihar Festoon Wire Lights across Top */}
      <div className="cp-festoon-wire-header">
        <TiharLights className="w-full" />
      </div>

      {/* Top Header Bar */}
      <header className="cp-header-bar">
        <a href="/" className="cp-back-btn" title="Back to Spin & Win Wheel">
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Spin &amp; Win</span>
        </a>

        {/* AlamTech CashPatti Logo */}
        <div className="cp-logo-badge">
          <span className="cp-logo-at">ALAMTECH</span>
          <span className="cp-logo-bullet">•</span>
          <span className="cp-logo-game">CASHPATTI</span>
          <span className="cp-logo-nepali">(क्यास पत्ती)</span>
        </div>

        {/* Live Status Pill */}
        <div className="cp-status-pill">
          <span className="cp-pulse-dot" />
          <span className="cp-status-msg">{statusText}</span>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="cp-error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ============================================================== */}
      {/* PHASE 1: IDLE / PRIZE POOL SHOWCASE                            */}
      {/* ============================================================== */}
      {phase === PHASE.IDLE && (
        <section className="cp-intro-section">
          {/* Floating Nepali Currency Notes from Spinner Section */}
          <div className="cp-floating-cash top-left hidden md:block">
            <NepaliCashNote side="front" width={110} height={50} className="rotate-12 animate-float-slow" />
          </div>
          <div className="cp-floating-cash bottom-right hidden md:block">
            <NepaliCashNote side="back" width={120} height={54} className="-rotate-12 animate-float-slow" style={{ animationDelay: "1.8s" }} />
          </div>

          {/* Floating Dashain Diamond Kites */}
          <div className="cp-floating-kite top-right hidden lg:block">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-yellow-500 rotate-45 border-2 border-white shadow-lg animate-float-slow" />
          </div>
          <div className="cp-floating-kite bottom-left hidden lg:block">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rotate-45 border-2 border-white shadow-md animate-float-slow" style={{ animationDelay: "2.2s" }} />
          </div>

          {/* Main Showcase Card */}
          <div className="cp-intro-card">
            <div className="cp-festival-tag">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ALAMTECH.COM.NP • DASHAIN &amp; TIHAR SPECIAL</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <h1 className="cp-hero-title">
              <span>CASHPATTI</span>
              <span className="cp-hero-sub">SHOWDOWN</span>
            </h1>

            <p className="cp-hero-desc">
              Choose 1 of 6 players at the Teen Patti table. Watch the 3-card reveal showdown and win rewards up to <strong>Rs. 25,000</strong>!
            </p>

            {/* Prize Grid */}
            <div className="cp-prize-grid">
              <div className="cp-prize-card grand">
                <div className="cp-prize-badge-gold">
                  <Trophy className="w-4 h-4" />
                  <span>1ST PLACE</span>
                </div>
                <div className="cp-prize-val-grand">Rs. 25,000</div>
                <div className="cp-prize-label">Grand Jackpot</div>
              </div>

              <div className="cp-prize-card runner">
                <div className="cp-prize-badge-silver">🥈 2ND PLACE</div>
                <div className="cp-prize-val">Rs. 5,000</div>
                <div className="cp-prize-label">Cash Reward</div>
              </div>

              <div className="cp-prize-card bronze">
                <div className="cp-prize-badge-bronze">🥉 3RD PLACE</div>
                <div className="cp-prize-val">Rs. 1,000</div>
                <div className="cp-prize-label">Cash Reward</div>
              </div>

              <div className="cp-prize-card standard">
                <div className="cp-prize-badge-slate">4TH - 5TH PLACE</div>
                <div className="cp-prize-val-sub">Rs. 500 / Rs. 200</div>
                <div className="cp-prize-label">Instant Rewards</div>
              </div>
            </div>

            {/* 3-Step Guide */}
            <div className="cp-steps-row">
              <div className="cp-step-item">
                <span className="step-num">1</span>
                <span>Pick 1 Player</span>
              </div>
              <span className="step-arrow">➔</span>
              <div className="cp-step-item">
                <span className="step-num">2</span>
                <span>Watch Cards Reveal</span>
              </div>
              <span className="step-arrow">➔</span>
              <div className="cp-step-item">
                <span className="step-num">3</span>
                <span>Win Rewards</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartGame}
              className="cp-cta-spin-btn group"
            >
              <div className="cp-cta-shine" />
              <Play className="w-6 h-6 fill-current text-white group-hover:scale-110 transition-transform" />
              <span>ENTER CASHPATTI TABLE (खेल्नुहोस्)</span>
            </button>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* LOADING STATE                                                 */}
      {/* ============================================================== */}
      {phase === PHASE.LOADING && (
        <div className="cp-loading-screen">
          <div className="cp-poker-chip-spin">AT</div>
          <div className="cp-loading-text">Preparing CashPatti Table...</div>
        </div>
      )}

      {/* ============================================================== */}
      {/* GAME ARENA: ROUNDED CASINO OVAL TABLE                          */}
      {/* ============================================================== */}
      {[
        PHASE.SELECTING,
        PHASE.LOCKING,
        PHASE.SHUFFLING,
        PHASE.DEALING,
        PHASE.REVEALING,
        PHASE.RANKING,
        PHASE.PRIZE,
      ].includes(phase) && (
        <main className="cp-arena-container">
          <div className="cp-massive-table-wrapper">
            <div className="cp-massive-table-oval">
              {/* Outer Wood Rail */}
              <div className="cp-table-wood-rail">
                {/* Deep Emerald Casino Felt */}
                <div className="cp-table-felt-surface">
                  {/* Golden Racetrack Line */}
                  <div className="cp-table-racetrack" />

                  {/* ─────────────────────────────────────────────────────────── */}
                  {/* TABLE CENTER POT & ACTION BADGE                            */}
                  {/* ─────────────────────────────────────────────────────────── */}
                  <div className="cp-table-center-pot">
                    {/* 3D Stack of Casino Chips with ALAMTECH Brand Emblem */}
                    <div className="cp-chip-stack-wrapper">
                      <div className="cp-chip-3d chip-3" />
                      <div className="cp-chip-3d chip-2" />
                      <div className="cp-chip-3d chip-1">
                        <span className="chip-label">ALAMTECH</span>
                      </div>
                    </div>

                    {/* SELECTING: Pick One Player turn pill */}
                    {isSelecting && pendingPlayer === null && (
                      <div className="cp-turn-pill active-turn">
                        <span className="turn-pulse-dot" />
                        <span>Pick One Player</span>
                      </div>
                    )}

                    {/* CONFIRM SELECTION MODAL OVER CENTER */}
                    {isSelecting && pendingPlayer !== null && (
                      <div className="cp-confirm-modal-box animate-pop">
                        <div className="confirm-title">
                          Back <strong>{PLAYER_NAMES[pendingPlayer]}</strong> this round?
                        </div>
                        <div className="confirm-btn-row">
                          <button
                            className="btn-confirm-lock"
                            onClick={handleConfirmSelection}
                          >
                            ✅ Confirm Pick
                          </button>
                          <button
                            className="btn-cancel-lock"
                            onClick={() => setPendingPlayer(null)}
                          >
                            ✕ Back
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SHUFFLING ANIMATION IN MIDDLE */}
                    {phase === PHASE.SHUFFLING && (
                      <div className="cp-shuffle-center-box animate-pop">
                        <div className="cp-shuffle-cards-fan">
                          <div className="shuffle-card s-card-1" />
                          <div className="shuffle-card s-card-2" />
                          <div className="shuffle-card s-card-3" />
                        </div>
                        <div className="cp-turn-pill shuffling-turn">
                          <Shuffle className="w-4 h-4 text-amber-300 animate-spin" />
                          <span>AlamTech is Shuffling Cards...</span>
                        </div>
                      </div>
                    )}

                    {/* DEALING */}
                    {[PHASE.DEALING, PHASE.LOCKING].includes(phase) && (
                      <div className="cp-turn-pill dealing-turn">
                        <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                        <span>Dealing Cards...</span>
                      </div>
                    )}

                    {/* REVEALING */}
                    {phase === PHASE.REVEALING && (
                      <div className="cp-turn-pill revealing-turn">
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                        <span>Revealing Hands...</span>
                      </div>
                    )}

                    {/* FINAL RANKING SHOWCASE */}
                    {phase === PHASE.RANKING && (
                      <div className="cp-turn-pill ranking-turn">
                        <Trophy className="w-4 h-4 text-amber-300 animate-pulse" />
                        <span>🏆 Final Standings Revealed!</span>
                      </div>
                    )}
                  </div>

                  {/* ─────────────────────────────────────────────────────────── */}
                  {/* 6 PLAYER SEATS SPREAD AROUND THE ROUNDED OVAL TABLE        */}
                  {/* ─────────────────────────────────────────────────────────── */}
                  {seats.map(({ playerId, posClass, spreadDir }) => {
                    const isThisSelected =
                      selectedPlayer === playerId || pendingPlayer === playerId;
                    const isRevealedNow = revealedPlayers.has(playerId);
                    const cards = getPlayerCards(playerId);
                    const handName = isRevealedNow
                      ? getPlayerHandName(playerId)
                      : null;
                    const rank = getPlayerRank(playerId);

                    return (
                      <div
                        key={playerId}
                        className={`cp-seat-anchor ${posClass}`}
                      >
                        <PlayerSeat
                          playerId={playerId}
                          isSelected={isThisSelected}
                          isSelectable={isSelecting}
                          onSelect={() => handlePlayerClick(playerId)}
                          cards={hasRevealData ? cards : null}
                          faceUp={isRevealedNow}
                          handName={handName}
                          rank={ranksVisible ? rank : null}
                          isCustomerPlayer={selectedPlayer === playerId}
                          cardSpreadDirection={spreadDir}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ============================================================== */}
      {/* FINAL PRIZE REVEAL MODAL                                       */}
      {/* ============================================================== */}
      {phase === PHASE.PRIZE && prizeResult && (
        <PrizeReveal
          playerRank={playerRank}
          prizeResult={prizeResult}
          playerName={PLAYER_NAMES[selectedPlayer]}
          onPlayAgain={handleReset}
        />
      )}
    </div>
  );
}
