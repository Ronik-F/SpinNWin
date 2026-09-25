// Alam Tech (alamtech.com.np) - Official Promotional Prize Pool
// Genuine Tech Products available at New Road & Putalisadak stores, Kathmandu
// Price Hierarchy: Used by the Inverse-Weighting Cheating Algorithm (lower price = higher odds)
export const INITIAL_PRIZES = [
  {
    id: "hp-notebook-15",
    name: "HP Notebook 15",
    fullName: "HP Notebook 15 AMD Ryzen 7 7730U (16GB, 512GB SSD)",
    nepaliName: "एचपी नोटबुक १५ (Ryzen 7)",
    brand: "HP",
    img: "/products/hp-notebook-15.jpg",
    url: "https://alamtech.com.np/product/hp-notebook-15-ryzen-7-7730u-price-nepal/",
    cabinColor: "#dc2626", // Red - Grand Prize!
    borderColor: "#991b1b",
    price: 99990,
    value: "Rs. 99,990",
    badge: "🏆 GRAND PRIZE",
    description: "AMD Ryzen 7 7730U (8 Cores), 16GB RAM, 512GB SSD, 15.6\" FHD & Backlit Keyboard"
  },
  {
    id: "headset",
    name: "7.1 Gaming Headset",
    nepaliName: "आरजीबी हेडसेट",
    brand: "Redragon",
    img: "/products/headphone.svg",
    cabinColor: "#ea580c", // Vibrant Orange
    borderColor: "#c2410c",
    price: 4800,
    value: "Rs. 4,800",
    badge: "🔥 HOT",
    description: "7.1 Surround Sound Pro Gaming Headset with Noise-Cancelling Mic"
  },
  {
    id: "keyboard",
    name: "RGB Mech Keyboard",
    nepaliName: "मेकानिकल किबोर्ड",
    brand: "Royal Kludge",
    img: "/products/keyboard.svg",
    cabinColor: "#7c3aed", // Royal Purple
    borderColor: "#5b21b6",
    price: 6500,
    value: "Rs. 6,500",
    badge: "⚡ GAMING",
    description: "Hot-Swappable Mechanical Gaming Keyboard with Custom RGB Lighting"
  },
  {
    id: "mouse",
    name: "RGB Gaming Mouse",
    nepaliName: "गेमिङ माउस",
    brand: "Fantech",
    img: "/products/mouse.svg",
    cabinColor: "#16a34a", // Emerald Green
    borderColor: "#15803d",
    price: 3500,
    value: "Rs. 3,500",
    badge: "🎯 16K DPI",
    description: "Ultra-Lightweight Ergonomic RGB Optical Gaming Mouse"
  },
  {
    id: "smartwatch",
    name: "Smart Watch Ultra",
    nepaliName: "स्मार्ट वाच अल्ट्रा",
    brand: "Haylou / Kieslect",
    img: "/products/smartwatch.svg",
    cabinColor: "#0284c7", // Sky Blue
    borderColor: "#0369a1",
    price: 5999,
    value: "Rs. 5,999",
    badge: "✨ AMOLED",
    description: "Curved AMOLED Display with Bluetooth Calling & Health Tracking"
  },
  {
    id: "speaker",
    name: "Wireless Speaker",
    nepaliName: "ब्लुटुथ स्पिकर",
    brand: "Tribit / JBL",
    img: "/products/speaker.svg",
    cabinColor: "#d97706", // Amber / Gold
    borderColor: "#b45309",
    price: 4500,
    value: "Rs. 4,500",
    badge: "🎵 HEAVY BASS",
    description: "Waterproof Heavy Bass Portable Bluetooth Speaker with LED Lighting"
  },
  {
    id: "powerbank",
    name: "65W Fast Power Bank",
    nepaliName: "फास्ट पावर बैंक",
    brand: "Remax 20000mAh",
    img: "/products/powerbank.svg",
    cabinColor: "#2563eb", // Alam Tech Blue
    borderColor: "#1d4ed8",
    price: 4999,
    value: "Rs. 4,999",
    badge: "⚡ 65W PD",
    description: "20,000mAh Dual Type-C 65W PD Fast Charging Laptop Power Bank"
  },
  {
    id: "ssd",
    name: "1TB Gen4 NVMe SSD",
    nepaliName: "१ टीबी फास्ट एसएस्डी",
    brand: "Kingston / Lexar",
    img: "/products/ssd.svg",
    cabinColor: "#db2777", // Vivid Pink
    borderColor: "#be185d",
    price: 10500,
    value: "Rs. 10,500",
    badge: "🚀 7000MB/s",
    description: "PCIe Gen4x4 High-Speed M.2 NVMe Extreme Gaming SSD"
  },
  {
    id: "backpack",
    name: "Tech Laptop Bag",
    nepaliName: "प्रिमियम ल्यापटप ब्याग",
    brand: "Alam Tech Custom",
    img: "/products/backpack.svg",
    cabinColor: "#0d9488", // Teal
    borderColor: "#0f766e",
    price: 3200,
    value: "Rs. 3,200",
    badge: "🛡️ WATERPROOF",
    description: "Anti-Theft Water-Resistant 16-Inch Gaming Laptop Backpack"
  },
  {
    id: "router",
    name: "Wi-Fi 6 Router",
    nepaliName: "वाइफाइ ६ राउटर",
    brand: "TP-Link Archer",
    img: "/products/router.svg",
    cabinColor: "#3b82f6", // Electric Blue
    borderColor: "#1d4ed8",
    price: 6200,
    value: "Rs. 6,200",
    badge: "🌐 AX3000",
    description: "Gigabit Dual-Band High-Gain Multi-Stream Wi-Fi 6 Router"
  },
  {
    id: "earbuds",
    name: "ANC Wireless Earbuds",
    nepaliName: "वायरलेस एयरबड्स",
    brand: "Soundpeats / QCY",
    img: "/products/earbuds.svg",
    cabinColor: "#9333ea", // Purple
    borderColor: "#7e22ce",
    price: 4200,
    value: "Rs. 4,200",
    badge: "🎧 LOW LATENCY",
    description: "Active Noise Cancelling True Wireless Stereo Gaming Earbuds"
  },
  {
    id: "charger",
    name: "100W GaN Charger",
    nepaliName: "१०० वाट चार्जर",
    brand: "Baseus GaN III",
    img: "/products/charger.svg",
    cabinColor: "#4f46e5", // Indigo
    borderColor: "#3730a3",
    price: 3800,
    value: "Rs. 3,800",
    badge: "⚡ GaN FAST",
    description: "Ultra-Compact 4-Port GaN Fast Charger for Laptop & Mobile"
  }
];
