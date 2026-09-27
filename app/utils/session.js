"use client";

// Session schema:
// { name, phone, prize1 (wheel spin 1), prize2 (cashpatti), prize3 (wheel spin 2), updatedAt }
const SESSION_KEY = "alamtech_dashain_session_v2";

/**
 * Get current customer session from localStorage / sessionStorage
 */
export function getCustomerSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading session:", err);
    return null;
  }
}

/**
 * Save or update customer session
 */
export function saveCustomerSession(updates) {
  if (typeof window === "undefined") return;
  try {
    const existing = getCustomerSession() || {};
    const merged = { ...existing, ...updates, updatedAt: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(merged));
    return merged;
  } catch (err) {
    console.error("Error saving session:", err);
  }
}

/**
 * Clear customer session for a new game / customer
 */
export function clearCustomerSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem("cashpatti_session");
  } catch (err) {
    console.error("Error clearing session:", err);
  }
}

/**
 * Save current session to winners history
 */
export function saveToWinnersHistory(sessionData) {
  if (typeof window === "undefined" || !sessionData) return;
  try {
    const history = JSON.parse(localStorage.getItem("alamtech_winners_history") || "[]");
    history.push({ ...sessionData, completedAt: Date.now() });
    localStorage.setItem("alamtech_winners_history", JSON.stringify(history));
  } catch (err) {
    console.error("Error saving winner history:", err);
  }
}

