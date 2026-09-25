import React from "react";

export function PrizeIcon({ type, className = "w-6 h-6", color = "currentColor" }) {
  switch (type) {
    case "headphones":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        </svg>
      );
    case "keyboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="12" x="2" y="6" rx="2" />
          <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
        </svg>
      );
    case "mouse":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="5" y="2" width="14" height="20" rx="7" />
          <path d="M12 6v4" />
        </svg>
      );
    case "watch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="7" />
          <polyline points="12 9 12 12 13.5 13.5" />
          <path d="M16.51 17.35l-.85 3.65H8.34l-.85-3.65M7.49 6.65l.85-3.65h7.32l.85 3.65" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <circle cx="12" cy="14" r="4" />
          <line x1="12" x2="12.01" y1="6" y2="6" />
        </svg>
      );
    case "battery-charging":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="16" height="10" x="2" y="7" rx="2" />
          <line x1="22" x2="22" y1="11" y2="13" />
          <path d="m11 11-2 2h3l-1 2" />
        </svg>
      );
    case "hard-drive":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="22" x2="2" y1="12" y2="12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1="6" x2="6.01" y1="16" y2="16" />
          <line x1="10" x2="10.01" y1="16" y2="16" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      );
    case "wifi":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 20h.01M5 12.859a10 10 0 0 1 14 0M8.5 16.429a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0" />
        </svg>
      );
    case "earbuds":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 10v6a3 3 0 0 0 6 0v-6a5 5 0 0 0-10 0v6a7 7 0 0 0 14 0" />
          <circle cx="8" cy="15" r="2" />
          <circle cx="16" cy="15" r="2" />
        </svg>
      );
    case "usb":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="10" cy="14" r="2" />
          <circle cx="18" cy="8" r="2" />
          <path d="M10 12V4h4v8" />
          <path d="M14 6l4 2" />
          <path d="M8 8l-3 3v5a2 2 0 0 0 2 2h6" />
        </svg>
      );
    case "zap":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
}
