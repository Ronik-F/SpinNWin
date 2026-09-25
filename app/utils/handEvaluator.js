/**
 * CashPatti — Teen Patti Hand Evaluator
 * ======================================
 * Evaluates a 3-card Teen Patti hand and produces a fully comparable result.
 *
 * CORRECTED PROBABILITY TABLE (from combinatorics, C(52,3) = 22,100):
 *
 *   Trail         :  52 combinations  →  0.235%
 *   Pure Sequence :  48 combinations  →  0.217%
 *   Sequence      :  720 combinations →  3.258%   (total straights minus pure seqs)
 *   Color/Flush   :  1096 combinations → 4.959%  (total same-suit minus pure seqs: 1144-48=1096)
 *   Pair          :  3744 combinations → 16.941%
 *   High Card     : 16440 combinations → 74.389%
 *
 * NOTE on Color: C(13,3)*4 = 286*4 = 1144 flush combos total; minus 48 pure sequences = 1096 Color hands.
 * NOTE: ChatGPT's figure of 12.724% for Color appears to include sequences within flushes. Using strict
 * definitions where Sequence/Pure Sequence are ranked above Color, the correct Color probability is 4.959%.
 *
 * HAND RANKINGS (1 = best):
 *   1. Trail (Three of a Kind)
 *   2. Pure Sequence (Straight Flush)
 *   3. Sequence (Straight)
 *   4. Color (Flush)
 *   5. Pair
 *   6. High Card
 *
 * TIE-BREAKING:
 * Standard card-value comparison is used first. If hands are mathematically identical
 * in value (only suits differ), the CashPatti Campaign Deterministic Tiebreaker is applied:
 * highest unique card ID wins. This is explicitly a CashPatti campaign rule — NOT a
 * traditional Teen Patti rule — used solely to guarantee a unique promotional ranking.
 */

/** Hand type constants (lower = better) */
export const HAND_TYPES = {
  TRAIL: 1,
  PURE_SEQUENCE: 2,
  SEQUENCE: 3,
  COLOR: 4,
  PAIR: 5,
  HIGH_CARD: 6,
};

export const HAND_NAMES = {
  1: "Trail",
  2: "Pure Sequence",
  3: "Sequence",
  4: "Color",
  5: "Pair",
  6: "High Card",
};

export const HAND_DESCRIPTIONS = {
  1: "Three of a Kind",
  2: "Straight Flush",
  3: "Straight",
  4: "Flush",
  5: "Pair",
  6: "High Card",
};

/**
 * Determines if three cards form a sequence (consecutive values).
 * Special case: A-2-3 is the lowest possible sequence (Ace acts as 1).
 * Returns { isSeq: bool, sortedValues: [low, mid, high] for comparison }
 */
function checkSequence(cards) {
  const vals = cards.map((c) => c.value).sort((a, b) => a - b);
  const [lo, mid, hi] = vals;

  // Normal consecutive
  if (hi - mid === 1 && mid - lo === 1) {
    return { isSeq: true, sortedValues: vals, highCard: hi };
  }
  // Special case: A-2-3 (values [2, 3, 14] after sort)
  if (lo === 2 && mid === 3 && hi === 14) {
    return { isSeq: true, sortedValues: [1, 2, 3], highCard: 3 }; // Ace acts as 1, making 3 the high card
  }
  return { isSeq: false, sortedValues: vals, highCard: hi };
}

/**
 * Evaluates a single 3-card Teen Patti hand.
 * @param {Array} cards - Array of 3 card objects from deck.js
 * @returns {Object} HandResult for comparison and display
 */
export function evaluateHand(cards) {
  if (!cards || cards.length !== 3) throw new Error("Hand must have exactly 3 cards");

  const vals = cards.map((c) => c.value).sort((a, b) => b - a); // descending
  const suits = cards.map((c) => c.suitIndex);
  const isFlush = suits[0] === suits[1] && suits[1] === suits[2];
  const { isSeq, sortedValues, highCard } = checkSequence(cards);
  const isTrail = vals[0] === vals[1] && vals[1] === vals[2];

  // Pair detection
  let isPair = false;
  let pairValue = null;
  let kicker = null;
  if (vals[0] === vals[1]) { isPair = true; pairValue = vals[0]; kicker = vals[2]; }
  else if (vals[1] === vals[2]) { isPair = true; pairValue = vals[1]; kicker = vals[0]; }

  // Determine hand type
  let handType;
  let tieBreakers; // Array used for comparison: compare element-by-element, higher = better

  if (isTrail) {
    handType = HAND_TYPES.TRAIL;
    tieBreakers = [vals[0]]; // Just the triple value
  } else if (isSeq && isFlush) {
    handType = HAND_TYPES.PURE_SEQUENCE;
    // High card in sequence for comparison; A-2-3 gets highCard=3 (lowest pure seq)
    tieBreakers = [highCard];
  } else if (isSeq) {
    handType = HAND_TYPES.SEQUENCE;
    tieBreakers = [highCard];
  } else if (isFlush) {
    handType = HAND_TYPES.COLOR;
    tieBreakers = vals; // Compare all 3 descending
  } else if (isPair) {
    handType = HAND_TYPES.PAIR;
    tieBreakers = [pairValue, kicker]; // Pair rank first, then kicker
  } else {
    handType = HAND_TYPES.HIGH_CARD;
    tieBreakers = vals; // Compare all 3 descending
  }

  // Unique card ID sum — used as final CashPatti campaign tiebreaker only
  const cardIdSum = cards.reduce((s, c) => s + c.id, 0);

  // Build a human-readable label
  const sortedByVal = [...cards].sort((a, b) => b.value - a.value);
  const cardLabel = sortedByVal.map((c) => `${c.rank}${c.suit}`).join(" ");

  return {
    handType,
    handName: HAND_NAMES[handType],
    handDescription: HAND_DESCRIPTIONS[handType],
    cardLabel,
    tieBreakers,
    cardIdSum,
    cards,
  };
}

/**
 * Compare two HandResults. Returns:
 *   -1 if a is BETTER than b
 *   +1 if b is BETTER than a
 *    0 if truly equal (should not happen with unique IDs as final tiebreaker)
 */
export function compareHands(a, b) {
  // Lower handType = better
  if (a.handType !== b.handType) {
    return a.handType < b.handType ? -1 : 1;
  }

  // Same hand type: compare tieBreakers element by element (higher = better)
  const len = Math.max(a.tieBreakers.length, b.tieBreakers.length);
  for (let i = 0; i < len; i++) {
    const av = a.tieBreakers[i] ?? 0;
    const bv = b.tieBreakers[i] ?? 0;
    if (av !== bv) return av > bv ? -1 : 1;
  }

  // CashPatti Campaign Tiebreaker: highest card ID sum wins
  // (Not a Teen Patti rule — purely deterministic for promotional ranking)
  if (a.cardIdSum !== b.cardIdSum) {
    return a.cardIdSum > b.cardIdSum ? -1 : 1;
  }

  return 0; // Truly identical (mathematically impossible with real 52-card deck)
}

/**
 * Rank all players' hands from 1st (best) to Nth (worst).
 * @param {Array} hands - Array of arrays of 3 card objects (one per player)
 * @returns {Array} Sorted array: [{ playerId (0-indexed), rank, handResult }, ...]
 */
export function rankPlayers(hands) {
  const evaluated = hands.map((cards, idx) => ({
    playerId: idx,
    handResult: evaluateHand(cards),
  }));

  evaluated.sort((a, b) => compareHands(a.handResult, b.handResult));

  return evaluated.map((entry, sortedIdx) => ({
    ...entry,
    rank: sortedIdx + 1, // 1 = best
  }));
}
