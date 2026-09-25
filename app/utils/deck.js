/**
 * CashPatti — Standard 52-Card Deck System
 * ==========================================
 * Uses crypto.getRandomValues() (CSPRNG) for shuffle — never Math.random().
 * Cards are identified by a unique integer ID (0–51) for audit purposes.
 */

/** Card suits in display order */
export const SUITS = ["♠", "♥", "♦", "♣"]; // suitIndex: 0=Spades, 1=Hearts, 2=Diamonds, 3=Clubs

/** Card rank values and labels */
export const RANKS = [
  { value: 2,  label: "2" },
  { value: 3,  label: "3" },
  { value: 4,  label: "4" },
  { value: 5,  label: "5" },
  { value: 6,  label: "6" },
  { value: 7,  label: "7" },
  { value: 8,  label: "8" },
  { value: 9,  label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "J" },
  { value: 12, label: "Q" },
  { value: 13, label: "K" },
  { value: 14, label: "A" },
]; // rankIndex 0–12 → values 2–14

/**
 * Build a full 52-card deck in canonical order.
 * Card ID = suitIndex * 13 + rankIndex (0–51, unique per card).
 */
export function buildDeck() {
  const deck = [];
  for (let suitIdx = 0; suitIdx < 4; suitIdx++) {
    for (let rankIdx = 0; rankIdx < 13; rankIdx++) {
      deck.push({
        id: suitIdx * 13 + rankIdx,
        suit: SUITS[suitIdx],
        suitIndex: suitIdx,
        rank: RANKS[rankIdx].label,
        value: RANKS[rankIdx].value,
        rankIndex: rankIdx,
      });
    }
  }
  return deck; // 52 elements
}

/**
 * Cryptographically secure random integer in range [0, max].
 * Uses crypto.getRandomValues() — safe on both Node.js (Web Crypto) and browser.
 */
function secureRandomInt(max) {
  // Rejection-sampling to avoid modulo bias
  const range = max + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8) || 1;
  const maxSafe = Math.pow(256, bytesNeeded);
  const limit = maxSafe - (maxSafe % range); // trim bias zone

  const buf = new Uint8Array(bytesNeeded);
  let value;
  do {
    crypto.getRandomValues(buf);
    value = buf.reduce((acc, b, i) => acc + b * Math.pow(256, i), 0);
  } while (value >= limit);

  return value % range;
}

/**
 * Fisher-Yates (Knuth) shuffle using CSPRNG.
 * Returns a NEW shuffled array — does not mutate the input.
 */
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = secureRandomInt(i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deal 3 cards to each of N players from a pre-shuffled deck.
 * Returns an array of hands: [[card,card,card], [card,card,card], ...]
 * Cards are dealt interleaved (like a real deal), not in blocks.
 */
export function dealHands(shuffledDeck, playerCount = 6) {
  const hands = Array.from({ length: playerCount }, () => []);
  for (let round = 0; round < 3; round++) {
    for (let p = 0; p < playerCount; p++) {
      const cardIndex = round * playerCount + p;
      hands[p].push(shuffledDeck[cardIndex]);
    }
  }
  return hands;
}

/**
 * Generate a complete game: shuffle + deal.
 * Returns { shuffledDeck, hands } where shuffledDeck is auditable.
 */
export function generateGame(playerCount = 6) {
  const deck = buildDeck();
  const shuffledDeck = shuffleDeck(deck);
  const hands = dealHands(shuffledDeck, playerCount);
  return { shuffledDeck, hands };
}
