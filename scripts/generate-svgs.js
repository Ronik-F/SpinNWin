const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/products');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'headphone.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="hpBand" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="25%" stop-color="#334155"/>
        <stop offset="50%" stop-color="#ef4444"/>
        <stop offset="75%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="hpCupL" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="60%" stop-color="#b91c1c"/>
        <stop offset="100%" stop-color="#450a0a"/>
      </linearGradient>
      <filter id="hpGlow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#ef4444" flood-opacity="0.3"/>
      </filter>
    </defs>
    <!-- Cushion Arc -->
    <path d="M 38 85 C 34 32, 126 32, 122 85" fill="none" stroke="#1e293b" stroke-width="16" stroke-linecap="round"/>
    <path d="M 38 85 C 34 32, 126 32, 122 85" fill="none" stroke="url(#hpBand)" stroke-width="12" stroke-linecap="round"/>
    <!-- Outer Metal Sliders -->
    <line x1="33" y1="72" x2="33" y2="92" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <line x1="127" y1="72" x2="127" y2="92" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <!-- Left Earcup Assembly -->
    <rect x="20" y="72" width="26" height="48" rx="13" fill="url(#hpCupL)" stroke="#1e293b" stroke-width="2" filter="url(#hpGlow)"/>
    <rect x="25" y="78" width="16" height="36" rx="8" fill="#18181b"/>
    <circle cx="33" cy="96" r="6" fill="#ef4444" opacity="0.9"/>
    <path d="M 33 80 L 33 112" stroke="#ef4444" stroke-width="2" opacity="0.6"/>
    <!-- Right Earcup Assembly -->
    <rect x="114" y="72" width="26" height="48" rx="13" fill="url(#hpCupL)" stroke="#1e293b" stroke-width="2" filter="url(#hpGlow)"/>
    <rect x="119" y="78" width="16" height="36" rx="8" fill="#18181b"/>
    <circle cx="127" cy="96" r="6" fill="#ef4444" opacity="0.9"/>
    <!-- Boom Microphone -->
    <path d="M 33 108 Q 42 138 78 132" fill="none" stroke="#475569" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="82" cy="131" r="6" fill="#ef4444"/>
    <circle cx="82" cy="131" r="3" fill="#ffffff"/>
  </svg>`,

  'keyboard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="rgbStrip" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="25%" stop-color="#f59e0b"/>
        <stop offset="50%" stop-color="#10b981"/>
        <stop offset="75%" stop-color="#06b6d4"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <!-- Keyboard Chassis Shadow & Body -->
    <rect x="10" y="46" width="140" height="74" rx="10" fill="#090d16" stroke="#334155" stroke-width="2.5"/>
    <!-- RGB Bevel Border -->
    <rect x="13" y="49" width="134" height="68" rx="8" fill="none" stroke="url(#rgbStrip)" stroke-width="2.5" opacity="0.85"/>
    <rect x="16" y="52" width="128" height="62" rx="6" fill="#1e293b"/>
    <!-- Key Rows -->
    <g fill="#0f172a" stroke="#475569" stroke-width="0.8">
      <!-- Function Row -->
      <rect x="22" y="56" width="9" height="7" rx="2" fill="#ef4444"/><rect x="33" y="56" width="9" height="7" rx="2"/><rect x="44" y="56" width="9" height="7" rx="2"/><rect x="55" y="56" width="9" height="7" rx="2"/><rect x="66" y="56" width="9" height="7" rx="2"/><rect x="77" y="56" width="9" height="7" rx="2"/><rect x="88" y="56" width="9" height="7" rx="2"/><rect x="99" y="56" width="9" height="7" rx="2"/><rect x="110" y="56" width="9" height="7" rx="2"/><rect x="121" y="56" width="17" height="7" rx="2" fill="#8b5cf6"/>
      <!-- Number Row -->
      <rect x="22" y="66" width="12" height="8" rx="2"/><rect x="36" y="66" width="9" height="8" rx="2"/><rect x="47" y="66" width="9" height="8" rx="2"/><rect x="58" y="66" width="9" height="8" rx="2"/><rect x="69" y="66" width="9" height="8" rx="2"/><rect x="80" y="66" width="9" height="8" rx="2"/><rect x="91" y="66" width="9" height="8" rx="2"/><rect x="102" y="66" width="9" height="8" rx="2"/><rect x="113" y="66" width="9" height="8" rx="2"/><rect x="124" y="66" width="14" height="8" rx="2"/>
      <!-- QWERTY Row -->
      <rect x="22" y="76" width="15" height="8" rx="2" fill="#3b82f6"/><rect x="39" y="76" width="9" height="8" rx="2"/><rect x="50" y="76" width="9" height="8" rx="2"/><rect x="61" y="76" width="9" height="8" rx="2"/><rect x="72" y="76" width="9" height="8" rx="2"/><rect x="83" y="76" width="9" height="8" rx="2"/><rect x="94" y="76" width="9" height="8" rx="2"/><rect x="105" y="76" width="9" height="8" rx="2"/><rect x="116" y="76" width="22" height="8" rx="2" fill="#10b981"/>
      <!-- Home Row -->
      <rect x="22" y="86" width="18" height="8" rx="2"/><rect x="42" y="86" width="9" height="8" rx="2"/><rect x="53" y="86" width="9" height="8" rx="2"/><rect x="64" y="86" width="9" height="8" rx="2"/><rect x="75" y="86" width="9" height="8" rx="2"/><rect x="86" y="86" width="9" height="8" rx="2"/><rect x="97" y="86" width="9" height="8" rx="2"/><rect x="108" y="86" width="30" height="8" rx="2" fill="#8b5cf6"/>
      <!-- Spacebar Row -->
      <rect x="22" y="96" width="14" height="10" rx="2"/><rect x="38" y="96" width="12" height="10" rx="2"/><rect x="52" y="96" width="62" height="10" rx="2.5" fill="#8b5cf6"/><rect x="116" y="96" width="10" height="10" rx="2"/><rect x="128" y="96" width="10" height="10" rx="2"/>
    </g>
  </svg>`,

  'mouse.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="mouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="40%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <!-- Ergonomic Gaming Mouse -->
    <path d="M 52 38 C 52 20, 108 20, 108 38 L 114 102 C 114 130, 46 130, 46 102 Z" fill="url(#mouseGrad)" stroke="#334155" stroke-width="3"/>
    <!-- Thumb Rest Left -->
    <path d="M 50 78 C 38 88, 38 112, 48 118" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <!-- Split Seam -->
    <line x1="80" y1="22" x2="80" y2="64" stroke="#10b981" stroke-width="2.5"/>
    <!-- Scroll Wheel -->
    <rect x="74" y="34" width="12" height="22" rx="6" fill="#10b981" stroke="#047857" stroke-width="1.5"/>
    <line x1="74" y1="42" x2="86" y2="42" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="74" y1="48" x2="86" y2="48" stroke="#ffffff" stroke-width="1.5"/>
    <!-- DPI Switch Button -->
    <rect x="76" y="62" width="8" height="8" rx="2" fill="#64748b"/>
    <!-- RGB Neon Accent Ribbons -->
    <path d="M 56 82 Q 80 96 104 82" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <!-- Pulsing Gaming Emblem -->
    <polygon points="80,102 87,112 73,112" fill="#10b981"/>
    <polygon points="80,118 87,108 73,108" fill="#10b981" opacity="0.6"/>
  </svg>`,

  'smartwatch.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="swOled" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#030712"/>
      </linearGradient>
    </defs>
    <!-- Straps Top & Bottom -->
    <path d="M 60 10 L 100 10 L 96 44 L 64 44 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <path d="M 64 116 L 96 116 L 100 150 L 60 150 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <!-- Watch Case Curved Aluminum -->
    <rect x="42" y="36" width="76" height="88" rx="24" fill="#0f172a" stroke="#06b6d4" stroke-width="4"/>
    <!-- Digital Crown -->
    <rect x="118" y="54" width="6" height="18" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5"/>
    <!-- Side Button -->
    <rect x="118" y="82" width="4" height="14" rx="2" fill="#64748b"/>
    <!-- Glass Display -->
    <rect x="48" y="42" width="64" height="76" rx="18" fill="url(#swOled)"/>
    <!-- Digital Clock Interface -->
    <text x="80" y="74" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="900" font-family="system-ui">10:08</text>
    <!-- Activity Rings -->
    <circle cx="80" cy="94" r="13" fill="none" stroke="#1e293b" stroke-width="3.5"/>
    <circle cx="80" cy="94" r="13" fill="none" stroke="#ef4444" stroke-width="3.5" stroke-dasharray="60 90"/>
    <circle cx="80" cy="94" r="9" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="40 60"/>
  </svg>`,

  'speaker.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="spkBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="50%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>
    </defs>
    <!-- Heavy Bass Cylinder -->
    <rect x="42" y="24" width="76" height="112" rx="26" fill="url(#spkBodyGrad)" stroke="#78350f" stroke-width="3"/>
    <!-- Top & Bottom Passive Radiators -->
    <ellipse cx="80" cy="28" rx="32" ry="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2.5"/>
    <ellipse cx="80" cy="132" rx="32" ry="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2.5"/>
    <!-- Acoustic Mesh Grille Dots -->
    <g fill="#1e293b" opacity="0.6">
      <circle cx="62" cy="54" r="3.5"/><circle cx="80" cy="54" r="3.5"/><circle cx="98" cy="54" r="3.5"/>
      <circle cx="71" cy="66" r="3.5"/><circle cx="89" cy="66" r="3.5"/>
      <circle cx="62" cy="78" r="3.5"/><circle cx="80" cy="78" r="3.5"/><circle cx="98" cy="78" r="3.5"/>
      <circle cx="71" cy="90" r="3.5"/><circle cx="89" cy="90" r="3.5"/>
      <circle cx="62" cy="102" r="3.5"/><circle cx="80" cy="102" r="3.5"/><circle cx="98" cy="102" r="3.5"/>
    </g>
    <!-- Center Emblem -->
    <rect x="68" y="70" width="24" height="18" rx="4" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
    <polygon points="77,74 85,79 77,84" fill="#d97706"/>
  </svg>`,

  'powerbank.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- Slim Aluminium Body -->
    <rect x="42" y="16" width="76" height="128" rx="14" fill="#1e293b" stroke="#2563eb" stroke-width="4"/>
    <!-- Top Ports Cap -->
    <rect x="48" y="22" width="64" height="16" rx="4" fill="#0f172a"/>
    <rect x="54" y="26" width="14" height="8" rx="2" fill="#2563eb"/>
    <rect x="74" y="26" width="14" height="8" rx="2" fill="#2563eb"/>
    <rect x="94" y="28" width="10" height="4" rx="1.5" fill="#64748b"/>
    <!-- Digital LED Percentage Display -->
    <rect x="58" y="52" width="44" height="22" rx="6" fill="#0284c7" opacity="0.2"/>
    <text x="80" y="68" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="monospace">100%</text>
    <!-- Engraved Specs -->
    <text x="80" y="108" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">20,000 mAh</text>
    <text x="80" y="122" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="extrabold">65W FAST PD</text>
  </svg>`,

  'ssd.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="ssdHeatsink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e1b4b"/>
        <stop offset="40%" stop-color="#312e81"/>
        <stop offset="70%" stop-color="#db2777"/>
        <stop offset="100%" stop-color="#be185d"/>
      </linearGradient>
      <linearGradient id="goldPins" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
      <filter id="ssdShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <!-- Matte Black PCB Board -->
    <rect x="12" y="32" width="136" height="96" rx="8" fill="#090d16" stroke="#334155" stroke-width="2.5" filter="url(#ssdShadow)"/>
    <!-- Circuit Board Copper Traces -->
    <path d="M 28 42 L 45 42 L 55 52 L 132 52" stroke="#db2777" stroke-width="1.2" fill="none" opacity="0.4"/>
    <path d="M 28 118 L 48 118 L 58 108 L 132 108" stroke="#38bdf8" stroke-width="1.2" fill="none" opacity="0.4"/>
    <!-- Gold M.2 Connector Edge -->
    <g fill="url(#goldPins)">
      <rect x="12" y="44" width="7" height="6" rx="1"/>
      <rect x="12" y="54" width="7" height="6" rx="1"/>
      <rect x="12" y="64" width="7" height="6" rx="1"/>
      <rect x="12" y="74" width="7" height="6" rx="1"/>
      <rect x="12" y="84" width="7" height="6" rx="1"/>
      <rect x="12" y="94" width="7" height="6" rx="1"/>
      <rect x="12" y="104" width="7" height="6" rx="1"/>
    </g>
    <!-- Sculpted Aluminum Heatsink -->
    <rect x="26" y="38" width="116" height="84" rx="6" fill="url(#ssdHeatsink)" stroke="#ec4899" stroke-width="2"/>
    <!-- Heatsink Geometric Fins -->
    <polygon points="34,44 134,44 126,58 34,58" fill="#0f172a" opacity="0.55"/>
    <polygon points="34,62 124,62 116,76 34,76" fill="#0f172a" opacity="0.55"/>
    <polygon points="34,80 114,80 106,94 34,94" fill="#0f172a" opacity="0.55"/>
    <!-- High-Impact 1TB Typography -->
    <text x="56" y="80" fill="#ffffff" font-size="24" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="-0.5">1 TB</text>
    <!-- Gen4 & Extreme Speed Badges -->
    <rect x="96" y="58" width="40" height="16" rx="4" fill="#090d16" stroke="#ec4899" stroke-width="1"/>
    <text x="116" y="70" text-anchor="middle" fill="#f472b6" font-size="9" font-weight="900" font-family="system-ui">GEN 4</text>
    <rect x="52" y="96" width="84" height="18" rx="4" fill="#090d16" stroke="#38bdf8" stroke-width="1"/>
    <text x="94" y="109" text-anchor="middle" fill="#38bdf8" font-size="9.5" font-weight="900" font-family="monospace">7400 MB/s NVMe</text>
    <!-- Cyan Status Micro-LED -->
    <circle cx="134" cy="46" r="3" fill="#38bdf8"/>
    <circle cx="134" cy="46" r="1.5" fill="#ffffff"/>
  </svg>`,

  'backpack.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- Top Carry Handle -->
    <path d="M 64 24 Q 80 14 96 24" fill="none" stroke="#14b8a6" stroke-width="6" stroke-linecap="round"/>
    <!-- Main Backpack Body -->
    <path d="M 44 36 C 44 26, 116 26, 116 36 L 122 126 C 122 142, 38 142, 38 126 Z" fill="#1e293b" stroke="#0f766e" stroke-width="3"/>
    <!-- Geometric Front Shield -->
    <path d="M 50 56 L 110 56 L 104 118 L 56 118 Z" fill="#14b8a6" opacity="0.9"/>
    <!-- Diagonal Waterproof Zipper -->
    <line x1="56" y1="66" x2="104" y2="108" stroke="#ffffff" stroke-width="3" stroke-dasharray="4 3"/>
    <!-- Rubber Brand Patch -->
    <rect x="70" y="78" width="20" height="10" rx="2" fill="#0f172a"/>
  </svg>`,

  'router.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- 4 High Gain Antennas -->
    <line x1="28" y1="18" x2="42" y2="76" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
    <line x1="62" y1="12" x2="68" y2="76" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
    <line x1="98" y1="12" x2="92" y2="76" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
    <line x1="132" y1="18" x2="118" y2="76" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
    <!-- Futuristic Router Body -->
    <polygon points="18,88 42,74 118,74 142,88 134,116 26,116" fill="#1e293b" stroke="#2563eb" stroke-width="3.5"/>
    <!-- Status LEDs -->
    <circle cx="56" cy="94" r="3" fill="#10b981"/>
    <circle cx="68" cy="94" r="3" fill="#10b981"/>
    <circle cx="80" cy="94" r="3" fill="#06b6d4"/>
    <circle cx="92" cy="94" r="3" fill="#10b981"/>
    <circle cx="104" cy="94" r="3" fill="#10b981"/>
    <!-- Wi-Fi 6 Text -->
    <text x="80" y="108" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="900">Wi-Fi 6 AX</text>
  </svg>`,

  'earbuds.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- Open Charging Case Base -->
    <rect x="36" y="58" width="88" height="66" rx="28" fill="#1e293b" stroke="#a855f7" stroke-width="4"/>
    <!-- Lid Arc -->
    <path d="M 40 58 C 40 28, 120 28, 120 58" fill="none" stroke="#7e22ce" stroke-width="3.5"/>
    <!-- Earbuds resting in magnetic dock -->
    <circle cx="60" cy="64" r="12" fill="#a855f7" stroke="#ffffff" stroke-width="2"/>
    <circle cx="100" cy="64" r="12" fill="#a855f7" stroke="#ffffff" stroke-width="2"/>
    <rect x="57" y="70" width="6" height="22" rx="3" fill="#ffffff"/>
    <rect x="97" y="70" width="6" height="22" rx="3" fill="#ffffff"/>
    <!-- Battery Level LED -->
    <circle cx="80" cy="96" r="3" fill="#10b981"/>
  </svg>`,

  'pendrive.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- Brushed Metal USB Body -->
    <rect x="44" y="54" width="68" height="34" rx="6" fill="#94a3b8" stroke="#334155" stroke-width="3"/>
    <!-- USB Plug -->
    <rect x="22" y="60" width="22" height="22" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
    <rect x="26" y="64" width="4" height="4" fill="#0f172a"/>
    <rect x="26" y="74" width="4" height="4" fill="#0f172a"/>
    <!-- Metal Swivel Hinge -->
    <path d="M 90 44 L 118 44 C 132 44, 132 98, 118 98 L 90 98 Z" fill="none" stroke="#f97316" stroke-width="6"/>
    <circle cx="118" cy="71" r="7" fill="#f97316"/>
    <!-- 128GB High Speed -->
    <text x="74" y="76" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="900">128 GB</text>
  </svg>`,

  'charger.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- Folded Pins -->
    <rect x="20" y="56" width="18" height="8" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <rect x="20" y="78" width="18" height="8" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <!-- GaN Power Block -->
    <rect x="38" y="36" width="88" height="72" rx="14" fill="#1e293b" stroke="#6366f1" stroke-width="4"/>
    <!-- Port Array Front -->
    <rect x="104" y="46" width="14" height="8" rx="3" fill="#6366f1"/>
    <rect x="104" y="60" width="14" height="8" rx="3" fill="#6366f1"/>
    <rect x="104" y="74" width="14" height="10" rx="2.5" fill="#f59e0b"/>
    <!-- 100W GaN III Print -->
    <text x="68" y="70" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="900">100W</text>
    <text x="68" y="85" text-anchor="middle" fill="#818cf8" font-size="11" font-weight="bold">GaN III</text>
  </svg>`,

  'laptop.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="200" height="160">
    <defs>
      <linearGradient id="laptopScreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7"/>
        <stop offset="50%" stop-color="#2563eb"/>
        <stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>
    </defs>
    <!-- Angled Display Lid -->
    <polygon points="40,24 160,24 174,104 26,104" fill="#0f172a" stroke="#334155" stroke-width="3"/>
    <polygon points="46,30 154,30 167,98 33,98" fill="url(#laptopScreen)"/>
    <!-- Glowing Brand Logo on Screen -->
    <polygon points="100,52 110,68 90,68" fill="#38bdf8" opacity="0.8"/>
    <!-- Base Keyboard Chassis -->
    <polygon points="12,108 188,108 174,136 26,136" fill="#090d16" stroke="#475569" stroke-width="2.5"/>
    <polygon points="30,111 170,111 160,125 40,125" fill="#38bdf8" opacity="0.6"/>
    <!-- Trackpad -->
    <polygon points="85,127 115,127 112,133 88,133" fill="#334155"/>
  </svg>`
};

Object.entries(svgs).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(dir, filename), content.trim());
});
console.log('High-fidelity SVGs generated successfully!');
