// Alam Tech (alamtech.com.np) - Official Promotional Prize Pool
// Genuine Tech Products available at New Road & Putalisadak stores, Kathmandu
//
// GRAND PRIZE ZERO-PERCENT POLICY:
// - "goat" and "asus-vivobook" are hardcoded in GRAND_PRIZE_IDS below.
// - Under NO circumstances can they be won on the wheel (strictly 0.00% probability).
//
// PROBABILITY HIERARCHY:
// Wireless mouse (25%) > laptop stand (23%) > cooler master (17.5%) > keyboard+mouse (13.5%) > wireless speaker (10.5%) > joystick (8.5%) > headphone (~1%) > smart watch (~1%)
// (Goat & Vivobook Laptop: STRICTLY 0.0000%)

export const INITIAL_PRIZES = [
  // ── GRAND PRIZES (Display Only — 0.00% odds, hardcoded guaranteed) ─────────
  {
    id: "goat",
    name: "Goat Giveaway",
    fullName: "AlamTech Dashain Goat Giveaway",
    nepaliName: "बाख्रा उपहार",
    brand: "AlamTech Special",
    img: "/products/Goat.jpg",
    url: "https://alamtech.com.np/",
    cabinColor: "#166534",
    borderColor: "#14532d",
    value: "Rs. 80,000",
    price: 80000,
    badge: "🐐 GOAT GIVEAWAY",
    description:
      "Win a real live goat this Dashain! AlamTech's grandest festival giveaway — a healthy, home-delivered goat for your family celebration.",
  },
  {
    id: "asus-vivobook",
    name: "ASUS Vivobook 14",
    fullName: "ASUS Vivobook 14 X1404 i5-1334U 12GB 256GB",
    nepaliName: "आसुस भिवोबुक ल्यापटप",
    brand: "ASUS",
    img: "/products/asuslaptop.webp",
    url: "https://alamtech.com.np/product/asus-vivobook-x1404-i5-1334u-price-nepal/",
    cabinColor: "#1e3a5f",
    borderColor: "#172a47",
    value: "Rs. 83,000",
    price: 83000,
    badge: "🏆 GRAND PRIZE",
    description:
      "Intel Core i5-1334U (10 Cores, 12th Gen), 12GB DDR4 RAM, 256GB NVMe SSD, 14\" Full HD IPS Display, 1-Year Warranty — available at AlamTech Tebahal, Kathmandu.",
  },

  // ── REGULAR PRIZES (Calibrated odds) ─────────────────────────────────────────
  {
    id: "mouse-only",
    name: "Wireless Mouse",
    fullName: "Fantech / Redragon Wireless Optical Mouse",
    nepaliName: "वायरलेस माउस",
    brand: "Fantech / Redragon",
    img: "/products/mousae.jpg",
    url: "https://alamtech.com.np/",
    cabinColor: "#16a34a",
    borderColor: "#15803d",
    value: "Rs. 1,000",
    price: 1000, // ~25.0% odds
    badge: "🎯 WIRELESS",
    description:
      "Wireless mouse only — compact ergonomic wireless optical mouse with silent clicks, long battery life, and plug-and-play USB receiver.",
  },
  {
    id: "laptop-stand",
    name: "Laptop Stand",
    fullName: "Adjustable Aluminum Laptop Stand",
    nepaliName: "ल्यापटप स्ट्याण्ड",
    brand: "AlamTech Picks",
    img: "/products/laptopstand.jpg",
    url: "https://alamtech.com.np/",
    cabinColor: "#0284c7",
    borderColor: "#0369a1",
    value: "Rs. 1,200",
    price: 1087, // ~23.0% odds
    badge: "💺 ERGONOMIC",
    description:
      "6-Level Height Adjustable Aluminum Alloy Laptop Stand with foldable anti-slip design — fits laptops 10\" to 17\".",
  },
  {
    id: "cooler-master-t20",
    name: "Cooler Master T20",
    fullName: "Cooler Master T20 CPU Air Cooler",
    nepaliName: "कुलर मास्टर सिपियु कुलर",
    brand: "Cooler Master",
    img: "/products/COOLER-MASTER-T20.webp",
    url: "https://alamtech.com.np/product/cooler-master-t20/",
    cabinColor: "#0f4c81",
    borderColor: "#0a3560",
    value: "Rs. 1,800",
    price: 1429, // ~17.5% odds
    badge: "❄️ CPU COOLER",
    description:
      "Cooler Master T20 CPU Air Cooler — top choice for PC builders and enthusiasts. Compact, efficient cooling for your custom PC build. Available at AlamTech, New Road, Kathmandu.",
  },
  {
    id: "keyboard-mouse-combo",
    name: "KB + Mouse Combo",
    fullName: "Mechanical Keyboard & Gaming Mouse Combo",
    nepaliName: "किबोर्ड माउस कम्बो",
    brand: "AlamTech Bundle",
    img: "/products/keyboardmouse.jpg",
    url: "https://alamtech.com.np/",
    cabinColor: "#7c3aed",
    borderColor: "#5b21b6",
    value: "Rs. 2,800",
    price: 1852, // ~13.5% odds
    badge: "🎮 COMBO DEAL",
    description:
      "Hot-Swappable RGB Mechanical Keyboard + Ultra-Lightweight Optical Gaming Mouse — curated bundle available exclusively at AlamTech stores.",
  },
  {
    id: "speaker",
    name: "Wireless Speaker",
    fullName: "Tribit / JBL Heavy Bass Portable Bluetooth Speaker",
    nepaliName: "ब्लुटुथ स्पिकर",
    brand: "Tribit / JBL",
    img: "/products/speaker.svg",
    url: "https://alamtech.com.np/",
    cabinColor: "#d97706",
    borderColor: "#b45309",
    value: "Rs. 3,500",
    price: 2381, // ~10.5% odds
    badge: "🎵 HEAVY BASS",
    description:
      "IPX7 Waterproof Heavy Bass Portable Bluetooth 5.3 Speaker with 360° sound, 24hr battery, and built-in LED party lights.",
  },
  {
    id: "joystick",
    name: "Gaming Joystick",
    fullName: "Wireless Bluetooth Gaming Controller / Joystick",
    nepaliName: "गेमिङ जोइस्टिक",
    brand: "Fantech / Redragon",
    img: "/products/joystick.avif",
    url: "https://alamtech.com.np/",
    cabinColor: "#2563eb",
    borderColor: "#1d4ed8",
    value: "Rs. 3,200",
    price: 2941, // ~8.5% odds
    badge: "🎮 WIRELESS",
    description:
      "Wireless Bluetooth Gaming Controller with Dual Vibration Motors, Ergonomic Design, and Multi-Platform Compatibility.",
  },
  {
    id: "headset",
    name: "Meetion HP030",
    fullName: "Meetion HP030 7.1 Surround Gaming Headset",
    nepaliName: "मिशन गेमिङ हेडसेट",
    brand: "Meetion",
    img: "/products/meetion.webp",
    url: "https://alamtech.com.np/product/meetion-hp030-gaming-headset-price-nepal/",
    cabinColor: "#ea580c",
    borderColor: "#c2410c",
    value: "Rs. 2,600",
    price: 23810, // ~1.0% odds
    badge: "🔥 7.1 SURROUND",
    description:
      "USB 7.1 Virtual Surround Sound Gaming Headset with omnidirectional noise-cancelling mic and RGB breathing light — available at AlamTech.",
  },
  {
    id: "smartwatch",
    name: "Smart Watch Ultra",
    fullName: "Haylou / Kieslect Curved AMOLED Smartwatch",
    nepaliName: "स्मार्ट वाच अल्ट्रा",
    brand: "Haylou / Kieslect",
    img: "/products/Smartwatch.webp",
    url: "https://alamtech.com.np/",
    cabinColor: "#0891b2",
    borderColor: "#0e7490",
    value: "Rs. 5,999",
    price: 26316, // ~1.0% odds
    badge: "✨ AMOLED",
    description:
      "Curved AMOLED Display with Bluetooth Calling, SpO2 & Heart Rate Monitoring, 7-day battery life, and 100+ sport modes.",
  },
];

/**
 * IDs of grand prizes that must NEVER appear as wheel spin outcomes.
 * These are hardcoded at 0% in pickWeightedWinnerIndex,
 * pickWeightedWinnerIndexWithCustomOdds, and calculatePrizeOdds.
 */
export const GRAND_PRIZE_IDS = ["goat", "asus-vivobook"];
