"use client";

const SESSION_KEY = "alamtech_dashain_session_v1";

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
