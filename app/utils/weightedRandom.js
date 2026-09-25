/**
 * Inverse Price Weighted Hierarchy Algorithm (Cheating Logic)
 * -------------------------------------------------------------
 * Principle:
 * - Products with the LEAST price have the GREATEST odds / chance to win.
 * - Products with the HIGHER price have LOWER odds / chance to win.
 * - Automatically recalibrates when prices are edited or updated by the client!
 *
 * Mathematical Formula:
 * - Price of prize i = P_i
 * - Raw Weight W_i = 1 / (P_i ^ exponent)
 * - Probability = (W_i / sum(W_all)) * 100%
 *
 * GRAND PRIZE BLACKLIST: Items in GRAND_PRIZE_IDS are HARDCODED to 0% and
 * can never appear as a wheel outcome, regardless of any other setting.
 */
import { GRAND_PRIZE_IDS } from "../data/prizes.js";

/**
 * Extracts a numeric price from a prize object (either from `price` number or parsed from `value` string)
 */
export function getNumericPrice(prize) {
  if (typeof prize.price === "number" && !isNaN(prize.price)) {
    return prize.price;
  }
  if (prize.value) {
    const parsed = parseInt(String(prize.value).replace(/[^0-9]/g, ""), 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 5000; // fallback default
}

/**
 * Calculates normalized odds/probabilities for all prizes based on inverse price hierarchy
 * @param {Array} prizes - Array of prize objects
 * @param {number} exponent - Sensitivity tuning (default 1.0 for linear inverse price; 1.2 for steeper bias towards low prices)
 * @returns {Array} Array of prizes enriched with numericPrice, weight, probabilityPercent, and tier
 */
export function calculatePrizeOdds(prizes, exponent = 1.0) {
  if (!prizes || prizes.length === 0) return [];

  // Extract clean numeric prices
  const withPrices = prizes.map((prize, index) => ({
    ...prize,
    originalIndex: index,
    numericPrice: getNumericPrice(prize),
  }));

  // Calculate inverse price weights: lower price => higher weight
  // HARDCODED: Grand prizes (goat, laptop) have 0 weight and 0% odds
  const rawWeights = withPrices.map((p) => {
    if (GRAND_PRIZE_IDS.includes(p.id)) return 0;
    return Math.pow(1 / p.numericPrice, exponent);
  });
  const totalWeight = rawWeights.reduce((sum, w) => sum + w, 0);

  return withPrices.map((prize, idx) => {
    const isBlacklisted = GRAND_PRIZE_IDS.includes(prize.id);
    const rawOdds = isBlacklisted || totalWeight === 0 ? 0 : (rawWeights[idx] / totalWeight) * 100;
    const probabilityPercent = Number(rawOdds.toFixed(2));

    // Dynamic Tiering based on price ranking
    let tier = "Standard Prize";
    if (isBlacklisted) {
      tier = "🎪 Display Only (0% odds)";
    } else if (prize.numericPrice >= 10000) {
      tier = "💎 Ultra Premium";
    } else if (prize.numericPrice >= 5000) {
      tier = "⚡ Mid Tier";
    } else {
      tier = "🎯 High Frequency (Most Likely)";
    }

    return {
      ...prize,
      weight: isBlacklisted ? 0 : rawWeights[idx],
      probabilityPercent,
      tier,
    };
  });
}

/**
 * Selects a winning prize index using the inverse price hierarchy
 * @param {Array} prizes - Array of prize objects
 * @param {number} exponent - Sensitivity tuning (default 1.0)
 * @returns {number} The winning index in the original `prizes` array
 */
export function pickWeightedWinnerIndex(prizes, exponent = 1.0) {
  if (!prizes || prizes.length === 0) return 0;

  // HARDCODED SAFETY: zero-out grand prize weights before rolling
  const enriched = calculatePrizeOdds(prizes, exponent).map((p) => ({
    ...p,
    weight: GRAND_PRIZE_IDS.includes(p.id) ? 0 : p.weight,
  }));

  const eligibleEnriched = enriched.filter((p) => p.weight > 0 && !GRAND_PRIZE_IDS.includes(p.id));
  if (eligibleEnriched.length === 0) return 0;

  const totalWeight = eligibleEnriched.reduce((sum, p) => sum + p.weight, 0);

  // Roll a random value between 0 and totalWeight
  const randomRoll = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < eligibleEnriched.length; i++) {
    cumulativeWeight += eligibleEnriched[i].weight;
    if (randomRoll <= cumulativeWeight) {
      return eligibleEnriched[i].originalIndex;
    }
  }

  // Fallback to last eligible item
  return eligibleEnriched[eligibleEnriched.length - 1].originalIndex;
}

/**
 * Selects a winning prize index using ADMIN-supplied custom odds (array of percentages, same order as prizes).
 * Prizes with 0% odds are excluded. Falls back to inverse-price if customOdds is null/empty.
 * @param {Array} prizes - Array of prize objects
 * @param {Array|null} customOdds - Array of percentage values per prize (e.g. [5.2, 3.1, ...]) or null
 * @param {number} exponent - Fallback sensitivity tuning
 * @returns {number} The winning index in the original `prizes` array
 */
export function pickWeightedWinnerIndexWithCustomOdds(prizes, customOdds, exponent = 1.0) {
  if (!customOdds || customOdds.length === 0) {
    return pickWeightedWinnerIndex(prizes, exponent);
  }

  // Build (index, weight) pairs — exclude zeroed-out prizes AND grand prize blacklist
  const candidates = prizes
    .map((p, i) => ({
      index: i,
      weight: GRAND_PRIZE_IDS.includes(p.id) ? 0 : Math.max(0, customOdds[i] ?? 0),
    }))
    .filter((c) => c.weight > 0);

  if (candidates.length === 0) return 0;

  const totalWeight = candidates.reduce((s, c) => s + c.weight, 0);
  const roll = Math.random() * totalWeight;

  let cumulative = 0;
  for (const candidate of candidates) {
    cumulative += candidate.weight;
    if (roll <= cumulative) return candidate.index;
  }
  return candidates[candidates.length - 1].index;
}
