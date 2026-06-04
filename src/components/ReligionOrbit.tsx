"use client";

// SVG religion symbols — all drawn inline, no external assets needed.
// Each symbol is a clean, minimal interpretation of the religious icon.
const SYMBOLS = [
  {
    name: "Christianity",
    color: "#b91c1c",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="32" height="32">
        <rect x="17" y="4" width="6" height="32" rx="2"/>
        <rect x="8" y="12" width="24" height="6" rx="2"/>
      </svg>
    ),
  },
  {
    name: "Judaism",
    color: "#1d4ed8",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" width="32" height="32">
        <polygon points="20,4 36,32 4,32"/>
        <polygon points="20,36 4,8 36,8"/>
      </svg>
    ),
  },
  {
    name: "Islam",
    color: "#15803d",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="32" height="32">
        <path d="M28 20a10 10 0 1 1-10-10 8 8 0 1 0 10 10z"/>
        <polygon points="26,8 28,14 24,11"/>
      </svg>
    ),
  },
  {
    name: "Hinduism",
    color: "#b45309",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="32" height="32">
        <text x="4" y="30" fontSize="28" fontFamily="serif" fontStyle="italic">&#x0950;</text>
      </svg>
    ),
  },
  {
    name: "Buddhism",
    color: "#7c3aed",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
        <circle cx="20" cy="20" r="14"/>
        <circle cx="20" cy="20" r="3"/>
        {[0,45,90,135,180,225,270,315].map((a) => {
          const r = Math.PI * a / 180;
          const x1 = 20 + 3 * Math.cos(r);
          const y1 = 20 + 3 * Math.sin(r);
          const x2 = 20 + 14 * Math.cos(r);
          const y2 = 20 + 14 * Math.sin(r);
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2}/>;
        })}
      </svg>
    ),
  },
  {
    name: "Sikhism",
    color: "#dc2626",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="32" height="32">
        <circle cx="20" cy="20" r="5"/>
        <path d="M20 4 C10 10 10 30 20 36 C30 30 30 10 20 4Z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M8 14 L32 26M8 26 L32 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Taoism",
    color: "#374151",
    svg: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 6 A7 7 0 0 1 20 20 A7 7 0 0 0 20 34 A14 14 0 0 1 20 6Z" fill="currentColor"/>
        <circle cx="20" cy="13" r="3" fill="white"/>
        <circle cx="20" cy="27" r="3" fill="currentColor"/>
        <circle cx="20" cy="13" r="1.2" fill="currentColor"/>
        <circle cx="20" cy="27" r="1.2" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Shinto",
    color: "#dc2626",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="32" height="32">
        <line x1="6" y1="12" x2="34" y2="12"/>
        <line x1="9" y1="8" x2="31" y2="8"/>
        <line x1="20" y1="12" x2="20" y2="36"/>
        <line x1="11" y1="22" x2="29" y2="22"/>
      </svg>
    ),
  },
];

export default function ReligionOrbit() {
  const count = SYMBOLS.length;
  const radius = 260; // orbit radius (CSS pixels, desktop)

  return (
    <div className="rel-orbit-wrap">
      <div className="rel-orbit-ring" />
      {SYMBOLS.map((s, i) => {
        const angle = (i / count) * 360;
        return (
          <div
            key={s.name}
            className="rel-orbit-item"
            style={{
              "--angle": `${angle}deg`,
              "--radius": `${radius}px`,
              "--color": s.color,
              animationDelay: `${-(i / count) * 28}s`,
            } as React.CSSProperties}
            title={s.name}
          >
            <span className="rel-orbit-symbol">{s.svg}</span>
            <span className="rel-orbit-label">{s.name}</span>
          </div>
        );
      })}
      <div className="rel-orbit-caption">
        Respectful of all faiths &amp; traditions
      </div>
    </div>
  );
}
