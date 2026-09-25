/**
 * CashPatti — Promotional Card & Prize Engine
 * ============================================
 * Controlled Promotional Odds:
 * - 6th Place: 50% (Rs. 0 / Better Luck Next Time - Most Common)
 * - 5th Place: 40% (Rs. 200 Cash - Very Common)
 * - 4th Place: 8%  (Rs. 500 Cash)
 * - 3rd Place: 2%  (Rs. 1,000 Cash - Rare)
 * - 2nd Place: 0%  (Rs. 5,000 Cash - 0% chance)
 * - 1st Place: 0%  (Rs. 25,000 - 0% chance)
 *
 * Total: 50% + 40% + 8% + 2% + 0% + 0% = 100%
 *
 * All dealt hands are genuine 3-card Teen Patti hands dealt from a real 52-card deck
 * with authentic Teen Patti rank evaluations.
 */

import { generateGame } from "./deck.js";
import { rankPlayers } from "./handEvaluator.js";

// In-memory session store
const SESSION_STORE = new Map();

/**
 * Pick target rank for customer's selected player using strict promotional weighted distribution:
 * - 6th Place: 50% (Better Luck Next Time)
 * - 5th Place: 40% (Rs. 200 Cash)
 * - 4th Place: 8%  (Rs. 500 Cash)
 * - 3rd Place: 2%  (Rs. 1,000 Cash)
 * - 2nd Place: 0%  (Rs. 5,000 Cash - strictly 0%)
 * - 1st Place: 0%  (Rs. 25,000 Cash - strictly 0%)
 */
function pickTargetRank() {
  const rand = Math.random() * 100;

  if (rand < 50) return 6; // 50% chance -> 6th place (Rs. 0 / Better Luck Next Time)
  if (rand < 90) return 5; // 40% chance -> 5th place (Rs. 200 Cash)
  if (rand < 98) return 4; // 8% chance  -> 4th place (Rs. 500 Cash)
  if (rand < 100) return 3; // 2% chance  -> 3rd place (Rs. 1,000 Cash)

  return 6; // Fallback
}

/** Prize mapping directly linked to player rank */
const RANK_PRIZES = {
  1: {
    won: true,
    prizeValue: 25000,
    prizeLabel: "Rs. 25,000",
    prizeType: "cash",
    rankLabel: "1st Place",
    isConsolation: false,
  },
  2: {
    won: true,
    prizeValue: 5000,
    prizeLabel: "Rs. 5,000",
    prizeType: "cash",
    rankLabel: "2nd Place",
    isConsolation: false,
  },
  3: {
    won: true,
    prizeValue: 1000,
    prizeLabel: "Rs. 1,000",
    prizeType: "cash",
    rankLabel: "3rd Place",
    isConsolation: false,
  },
  4: {
    won: true,
    prizeValue: 500,
    prizeLabel: "Rs. 500",
    prizeType: "cash",
    rankLabel: "4th Place",
    isConsolation: false,
  },
  5: {
    won: true,
    prizeValue: 200,
    prizeLabel: "Rs. 200",
    prizeType: "cash",
    rankLabel: "5th Place",
    isConsolation: false,
  },
  6: {
    won: false,
    prizeValue: 0,
    prizeLabel: "Better Luck Next Time",
    prizeType: "none",
    rankLabel: "6th Place",
    isConsolation: true,
    reason: "no_prize",
  },
};

/** Phase 1: Initialize game session */
export function createSession(userId = "anonymous") {
  const sessionId = crypto.randomUUID();

  const session = {
    sessionId,
    userId,
    status: "started",
    selectedPlayerId: null,
    targetRank: null,
    hands: null,
    rankings: null,
    playerRank: null,
    prizeResult: null,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };

  SESSION_STORE.set(sessionId, session);
  return { sessionId };
}

/**
 * Phase 2: Lock in player selection and deal legitimate hands mapped to weighted rank.
 */
export function selectPlayer(sessionId, playerId) {
  const session = SESSION_STORE.get(sessionId);
  if (!session) return { error: "Session not found" };
  if (session.status !== "started") return { error: "Selection already locked" };
  if (typeof playerId !== "number" || playerId < 0 || playerId > 5) {
    return { error: "Invalid player ID" };
  }

  // 1. Pick target rank for customer's chosen player according to exact probability
  const targetRank = pickTargetRank();

  // 2. Generate authentic 6-hand deal from 52-card deck
  const { hands: rawHands } = generateGame(6);
  const initialRankings = rankPlayers(rawHands);

  // Group hands by their evaluated rank
  // initialRankings has entries: { playerId: rawIdx, rank: 1..6, handResult }
  const handByRank = {};
  initialRankings.forEach((r) => {
    handByRank[r.rank] = rawHands[r.playerId];
  });

  // 3. Assign hand matching targetRank to the selectedPlayerId
  const finalHands = new Array(6);
  finalHands[playerId] = handByRank[targetRank];

  // Distribute the remaining 5 ranks among the other 5 players
  const otherPlayerIds = [0, 1, 2, 3, 4, 5].filter((id) => id !== playerId);
  const otherRanks = [1, 2, 3, 4, 5, 6].filter((r) => r !== targetRank);

  otherPlayerIds.forEach((pId, idx) => {
    finalHands[pId] = handByRank[otherRanks[idx]];
  });

  // 4. Re-rank all 6 finalized hands so everything is 100% verified and consistent
  const finalRankings = rankPlayers(finalHands);
  const verifiedPlayerRank = finalRankings.find((r) => r.playerId === playerId)?.rank ?? targetRank;

  session.selectedPlayerId = playerId;
  session.targetRank = verifiedPlayerRank;
  session.hands = finalHands;
  session.rankings = finalRankings;
  session.playerRank = verifiedPlayerRank;
  session.status = "player_selected";
  session.selectedAt = new Date().toISOString();

  return { success: true };
}

/** Phase 3: Return reveal data. Only callable after selection is locked. */
export function getRevealData(sessionId) {
  const session = SESSION_STORE.get(sessionId);
  if (!session) return { error: "Session not found" };
  if (session.status === "started") return { error: "Player not yet selected" };

  return {
    hands: session.hands.map((cards, idx) => ({
      playerId: idx,
      cards: cards.map((c) => ({
        suit: c.suit,
        rank: c.rank,
        value: c.value,
        suitIndex: c.suitIndex,
      })),
      handName: session.rankings.find((r) => r.playerId === idx)?.handResult.handName,
      cardLabel: session.rankings.find((r) => r.playerId === idx)?.handResult.cardLabel,
    })),
    rankings: session.rankings.map((r) => ({
      playerId: r.playerId,
      rank: r.rank,
      handName: r.handResult.handName,
      handDescription: r.handResult.handDescription,
      cardLabel: r.handResult.cardLabel,
    })),
    selectedPlayerId: session.selectedPlayerId,
    playerRank: session.playerRank,
  };
}

/** Phase 4: Complete game and resolve prize based directly on rank. */
export function completeSession(sessionId) {
  const session = SESSION_STORE.get(sessionId);
  if (!session) return { error: "Session not found" };
  if (session.status === "completed") {
    return {
      prizeResult: session.prizeResult,
      playerRank: session.playerRank,
      alreadyCompleted: true,
    };
  }
  if (session.status !== "player_selected") {
    return { error: "Session in invalid state for completion" };
  }

  const rank = session.playerRank ?? 6;
  const prizeResult = {
    ...RANK_PRIZES[rank],
    rank,
  };

  session.prizeResult = prizeResult;
  session.status = "completed";
  session.completedAt = new Date().toISOString();

  return { prizeResult, playerRank: rank };
}

/** Get session */
export function getSession(sessionId) {
  const session = SESSION_STORE.get(sessionId);
  if (!session) return null;
  return {
    sessionId: session.sessionId,
    status: session.status,
    selectedPlayerId: session.selectedPlayerId,
    playerRank: session.playerRank,
    prizeResult: session.prizeResult,
  };
}
