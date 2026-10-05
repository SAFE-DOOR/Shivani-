import React from 'react';

interface ProductVisualProps {
  category: string;
  subCategory?: string;
  name?: string;
  className?: string;
  aspectRatio?: '4:3' | '16:9' | '1:1';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  category,
  subCategory = '',
  name = '',
  className = '',
  aspectRatio = '4:3',
}) => {
  const aspectClass =
    aspectRatio === '16:9' ? 'aspect-16/9' : aspectRatio === '1:1' ? 'aspect-square' : 'aspect-4/3';

  // Render authentic commercial print graphic representations
  const renderVisualContent = () => {
    switch (category) {
      case 'stationery':
        if (subCategory.includes('Visiting') || name.includes('Visiting')) {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#0f172a" />
              {/* Textured studio surface */}
              <circle cx="200" cy="150" r="140" fill="#1e293b" opacity="0.6" filter="blur(40px)" />
              {/* Stacked Cards Shadow */}
              <rect x="85" y="115" width="220" height="130" rx="8" fill="#020617" opacity="0.5" />
              {/* Bottom Card */}
              <rect x="95" y="105" width="220" height="130" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              {/* Top Premium Card (350 GSM Velvet Matte with Gold Foil) */}
              <g transform="rotate(-6 200 145)">
                <rect x="90" y="85" width="220" height="130" rx="8" fill="#090d16" stroke="#fbbf24" strokeWidth="1.5" />
                {/* Spot UV gloss ribbon effect */}
                <path d="M 90 140 Q 150 110 200 130 T 310 100 L 310 160 L 90 160 Z" fill="#1e293b" opacity="0.5" />
                {/* Gold Foil Logo Emblem */}
                <circle cx="130" cy="120" r="14" fill="url(#goldGrad)" />
                <path d="M 125 120 L 135 120 M 130 115 L 130 125" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
                {/* Corporate Typography lines */}
                <rect x="155" y="113" width="70" height="6" rx="2" fill="url(#goldGrad)" />
                <rect x="155" y="123" width="45" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="110" y="165" width="90" height="3" rx="1.5" fill="#64748b" />
                <rect x="110" y="173" width="70" height="3" rx="1.5" fill="#475569" />
                {/* Velvet finish reflection highlight */}
                <line x1="90" y1="85" x2="310" y2="85" stroke="#fef08a" strokeWidth="2" opacity="0.4" />
              </g>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
            </svg>
          );
        } else if (subCategory.includes('Stamp') || name.includes('Stamp')) {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#18181b" />
              {/* Self Inking Stamp Body */}
              <rect x="150" y="70" width="100" height="70" rx="12" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
              <rect x="160" y="80" width="80" height="30" rx="6" fill="#b91c1c" />
              <rect x="175" y="140" width="50" height="45" fill="#52525b" />
              <rect x="135" y="185" width="130" height="35" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />
              {/* Clear Stamp Impression below */}
              <g opacity="0.85">
                <rect x="110" y="240" width="180" height="40" rx="4" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" fill="#eff6ff" fillOpacity="0.1" />
                <text x="200" y="260" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                  SHIVANI GRAPHICS
                </text>
                <text x="200" y="272" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="sans-serif">
                  ★ VERIFIED & APPROVED ★
                </text>
              </g>
            </svg>
          );
        } else {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#0f172a" />
              {/* Executive Letterhead Sheet */}
              <rect x="110" y="40" width="180" height="230" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {/* Header color bars */}
              <rect x="110" y="40" width="180" height="12" fill="#1e3a8a" />
              <rect x="110" y="52" width="180" height="3" fill="#3b82f6" />
              <circle cx="135" cy="72" r="8" fill="#1e3a8a" />
              <rect x="150" y="68" width="60" height="5" rx="1" fill="#1e293b" />
              <rect x="150" y="75" width="40" height="3" rx="1" fill="#64748b" />
              {/* Text lines */}
              <rect x="125" y="100" width="150" height="3" rx="1" fill="#cbd5e1" />
              <rect x="125" y="112" width="150" height="3" rx="1" fill="#cbd5e1" />
              <rect x="125" y="124" width="130" height="3" rx="1" fill="#cbd5e1" />
              <rect x="125" y="136" width="150" height="3" rx="1" fill="#cbd5e1" />
              <rect x="125" y="148" width="110" height="3" rx="1" fill="#cbd5e1" />
              {/* Bottom footer bar */}
              <rect x="110" y="260" width="180" height="10" fill="#0f172a" />
            </svg>
          );
        }

      case 'marketing':
        if (subCategory.includes('Standee') || name.includes('Standee')) {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#1e1b4b" />
              {/* Roll-up Banner Standee */}
              {/* Aluminium base */}
              <rect x="140" y="250" width="120" height="18" rx="4" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="140" cy="259" rx="6" ry="9" fill="#64748b" />
              <ellipse cx="260" cy="259" rx="6" ry="9" fill="#64748b" />
              {/* Vertical Banner Surface */}
              <rect x="155" y="45" width="90" height="205" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              {/* Banner Graphic Content */}
              <rect x="155" y="45" width="90" height="60" fill="#f97316" />
              <circle cx="200" cy="75" r="16" fill="#ffffff" opacity="0.9" />
              <rect x="165" y="120" width="70" height="10" rx="2" fill="#0f172a" />
              <rect x="165" y="138" width="60" height="5" rx="1" fill="#64748b" />
              <rect x="165" y="148" width="70" height="5" rx="1" fill="#94a3b8" />
              <rect x="165" y="180" width="70" height="30" rx="3" fill="#fed7aa" />
              <rect x="175" y="225" width="50" height="12" rx="6" fill="#ea580c" />
              {/* Aluminium Top Profile Clip */}
              <rect x="153" y="42" width="94" height="6" rx="2" fill="#cbd5e1" />
            </svg>
          );
        } else if (subCategory.includes('Flex') || name.includes('Flex')) {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#0f172a" />
              {/* Large Star Flex Banner */}
              <g transform="rotate(-3 200 150)">
                <rect x="50" y="80" width="300" height="140" rx="4" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
                {/* Brass Eyelets */}
                <circle cx="65" cy="95" r="4" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
                <circle cx="335" cy="95" r="4" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
                <circle cx="65" cy="205" r="4" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
                <circle cx="335" cy="205" r="4" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
                {/* Print Vibrancy */}
                <rect x="75" y="105" width="250" height="90" fill="#dc2626" rx="2" />
                <text x="200" y="145" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif">
                  GRAND OPENING
                </text>
                <text x="200" y="172" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                  STAR FLEX · HEAVY GSM PRINT
                </text>
              </g>
            </svg>
          );
        } else {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#1e1b4b" />
              {/* Trifold / Flyer Brochure */}
              <g transform="perspective(500px)">
                <polygon points="120,60 180,50 180,240 120,250" fill="#3b82f6" stroke="#2563eb" strokeWidth="1" />
                <polygon points="180,50 240,55 240,245 180,240" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
                <polygon points="240,55 290,65 290,255 240,245" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1" />
              </g>
              <circle cx="150" cy="110" r="14" fill="#ffffff" opacity="0.8" />
              <rect x="195" y="90" width="30" height="6" rx="1" fill="#1e3a8a" />
              <rect x="195" y="105" width="30" height="4" rx="1" fill="#1e3a8a" opacity="0.6" />
            </svg>
          );
        }

      case 'signage':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#09090b" />
            {/* Dark Architectural Stone / ACP Wall */}
            <rect x="40" y="50" width="320" height="200" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="2" />
            {/* Glowing 3D Acrylic Letters */}
            {/* Ambient backlight glow */}
            <circle cx="200" cy="150" r="80" fill="#f59e0b" opacity="0.25" filter="blur(35px)" />
            {/* 3D Acrylic Face */}
            <text
              x="200"
              y="155"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="34"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="3"
              style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.9))' }}
            >
              SHIVANI
            </text>
            <text
              x="200"
              y="185"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              fontFamily="sans-serif"
              letterSpacing="6"
              opacity="0.9"
            >
              LED SIGNAGE
            </text>
            {/* LED Modules Accent */}
            <circle cx="90" cy="225" r="3" fill="#22c55e" />
            <text x="102" y="228" fill="#a1a1aa" fontSize="9" fontFamily="sans-serif">
              IP67 Waterproof Samsung LEDs
            </text>
          </svg>
        );

      case 'gifting':
        if (subCategory.includes('Drinkware') || name.includes('Mug')) {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#1e293b" />
              {/* Mug Body */}
              <rect x="140" y="90" width="110" height="130" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              {/* Mug Handle */}
              <path d="M 250 115 C 290 115, 290 185, 250 185" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
              <path d="M 250 115 C 280 115, 280 185, 250 185" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
              {/* Printed Graphic on Mug */}
              <rect x="155" y="115" width="80" height="75" rx="6" fill="#3b82f6" />
              <circle cx="195" cy="140" r="14" fill="#ffffff" />
              <rect x="170" y="165" width="50" height="6" rx="2" fill="#ffffff" />
              {/* Shadow underneath */}
              <ellipse cx="200" cy="235" rx="70" ry="10" fill="#0f172a" opacity="0.6" />
            </svg>
          );
        } else if (subCategory.includes('Apparel') || name.includes('T-Shirt')) {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#0f172a" />
              {/* Corporate Cotton T-Shirt */}
              <path
                d="M 160 70 Q 200 90 240 70 L 290 100 L 265 140 L 245 130 L 245 235 L 155 235 L 155 130 L 135 140 L 110 100 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Collar detail */}
              <path d="M 170 70 Q 200 95 230 70" fill="none" stroke="#64748b" strokeWidth="2" />
              {/* DTF Printed Chest Artwork */}
              <rect x="175" y="120" width="50" height="35" rx="4" fill="#06b6d4" />
              <circle cx="200" cy="133" r="8" fill="#ffffff" />
              <text x="200" y="150" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                BRAND LOGO
              </text>
            </svg>
          );
        } else {
          return (
            <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#1c1917" />
              {/* Debossed Leatherette Diary */}
              <rect x="130" y="65" width="130" height="175" rx="8" fill="#44403c" stroke="#78716c" strokeWidth="2" />
              {/* Bookmark Ribbon */}
              <rect x="170" y="55" width="8" height="195" fill="#b91c1c" />
              {/* Magnetic snap */}
              <rect x="250" y="140" width="25" height="25" rx="4" fill="#a8a29e" stroke="#d6d3d1" strokeWidth="1" />
              {/* Debossed Golden Logo */}
              <circle cx="195" cy="130" r="16" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="195" y="134" textAnchor="middle" fill="#ca8a04" fontSize="10" fontWeight="bold">
                2026
              </text>
              {/* Metal Engraved Pen */}
              <g transform="rotate(25 270 120)">
                <rect x="260" y="60" width="8" height="130" rx="3" fill="#d4d4d8" stroke="#71717a" strokeWidth="1" />
                <rect x="260" y="70" width="8" height="35" fill="#18181b" />
                <path d="M 260 190 L 264 200 L 268 190 Z" fill="#71717a" />
              </g>
            </svg>
          );
        }

      case 'packaging':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#1c1917" />
            {/* Kraft Paper Carry Bag */}
            <polygon points="135,100 265,100 250,240 150,240" fill="#d97706" stroke="#b45309" strokeWidth="2" />
            <polygon points="150,240 250,240 240,250 160,250" fill="#92400e" />
            {/* Twisted Rope Handles */}
            <path d="M 175 100 C 175 60, 205 60, 205 100" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            {/* Brand Stamp on Bag */}
            <rect x="170" y="140" width="60" height="50" rx="4" fill="#78350f" opacity="0.8" />
            <text x="200" y="165" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">
              SHIVANI
            </text>
            <text x="200" y="177" textAnchor="middle" fill="#fef3c7" fontSize="8">
              PACKAGING
            </text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0f172a" />
            <circle cx="200" cy="150" r="60" fill="#1e293b" />
            <text x="200" y="155" textAnchor="middle" fill="#38bdf8" fontSize="18" fontWeight="bold">
              SHIVANI GRAPHICS
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden w-full ${aspectClass} ${className} bg-slate-900 flex items-center justify-center`}>
      {renderVisualContent()}
      {/* Subtle bottom gradient scrim for legible text placement */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
