"use client";

const SYMBOLS = [
  {
    name: "Christianity",
    color: "#b91c1c",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        <rect x="17" y="4" width="6" height="32" rx="2"/>
        <rect x="8" y="12" width="24" height="6" rx="2"/>
      </svg>
    ),
  },
  {
    name: "Judaism",
    color: "#1d4ed8",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" width="30" height="30">
        <polygon points="20,4 36,32 4,32"/>
        <polygon points="20,36 4,8 36,8"/>
      </svg>
    ),
  },
  {
    name: "Islam",
    color: "#15803d",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        <path d="M28 20a10 10 0 1 1-10-10 8 8 0 1 0 10 10z"/>
        <polygon points="27,9 29,15 23,12"/>
      </svg>
    ),
  },
  {
    name: "Hinduism",
    color: "#b45309",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        <text x="4" y="30" fontSize="28" fontFamily="serif" fontStyle="italic">&#x0950;</text>
      </svg>
    ),
  },
  {
    name: "Buddhism",
    color: "#7c3aed",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" width="30" height="30">
        <circle cx="20" cy="20" r="14"/>
        <circle cx="20" cy="20" r="3"/>
        {[0,45,90,135,180,225,270,315].map((a) => {
          const rad = Math.PI * a / 180;
          return <line key={a} x1={20+3*Math.cos(rad)} y1={20+3*Math.sin(rad)} x2={20+14*Math.cos(rad)} y2={20+14*Math.sin(rad)}/>;
        })}
      </svg>
    ),
  },
  {
    name: "Sikhism",
    color: "#b45309",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
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
      <svg viewBox="0 0 40 40" width="30" height="30">
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
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="30" height="30">
        <line x1="6" y1="12" x2="34" y2="12"/>
        <line x1="9" y1="8" x2="31" y2="8"/>
        <line x1="20" y1="12" x2="20" y2="36"/>
        <line x1="11" y1="22" x2="29" y2="22"/>
      </svg>
    ),
  },
  {
    name: "Jainism",
    color: "#0891b2",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" width="30" height="30">
        {/* Open hand (Jain symbol — Ahimsa) */}
        <path d="M20 34 C12 34 8 28 8 22 L8 14 C8 12 10 11 12 12 L12 8 C12 6 14 5 16 6 L16 7 C16 5 18 4 20 5 L20 6 C20 4 22 3.5 24 5 L24 10 C25 9 27 9.5 27 12 L27 22 C27 28 28 34 20 34Z"/>
        <circle cx="20" cy="22" r="3" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "Bahá'í",
    color: "#0369a1",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        {/* 9-pointed star */}
        {Array.from({length:9}).map((_,i) => {
          const a = (i * 360/9 - 90) * Math.PI/180;
          const a2 = ((i+0.5) * 360/9 - 90) * Math.PI/180;
          const ox = 20 + 16*Math.cos(a), oy = 20 + 16*Math.sin(a);
          const ix = 20 + 7*Math.cos(a2), iy = 20 + 7*Math.sin(a2);
          return null; // drawn as polygon below
        })}
        <polygon points={
          Array.from({length:9}).map((_,i) => {
            const outer = (i*360/9 - 90)*Math.PI/180;
            const inner = ((i+0.5)*360/9 - 90)*Math.PI/180;
            const ox = 20+15*Math.cos(outer), oy = 20+15*Math.sin(outer);
            const ix = 20+7*Math.cos(inner), iy = 20+7*Math.sin(inner);
            return `${ox.toFixed(1)},${oy.toFixed(1)} ${ix.toFixed(1)},${iy.toFixed(1)}`;
          }).join(' ')
        }/>
      </svg>
    ),
  },
  {
    name: "Zoroastrian",
    color: "#d97706",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" width="30" height="30">
        {/* Faravahar wings simplified */}
        <circle cx="20" cy="17" r="4" fill="currentColor" stroke="none"/>
        <path d="M6 17 Q13 10 20 13 Q27 10 34 17" strokeWidth="2.5"/>
        <path d="M6 17 Q13 24 20 21 Q27 24 34 17" strokeWidth="2.5"/>
        <line x1="20" y1="21" x2="18" y2="34" strokeWidth="2"/>
        <line x1="20" y1="21" x2="22" y2="34" strokeWidth="2"/>
        <line x1="16" y1="29" x2="24" y2="29" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Confucianism",
    color: "#166534",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        {/* 儒 — simplified representation with water + person ideogram */}
        <text x="7" y="30" fontSize="24" fontFamily="serif">&#x5112;</text>
      </svg>
    ),
  },
  {
    name: "Native Spirit",
    color: "#7c3aed",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" width="30" height="30">
        {/* Medicine wheel / sacred circle */}
        <circle cx="20" cy="20" r="14"/>
        <line x1="20" y1="6" x2="20" y2="34"/>
        <line x1="6" y1="20" x2="34" y2="20"/>
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "Orthodox",
    color: "#1e40af",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        {/* Orthodox cross — three crossbars */}
        <rect x="18" y="3" width="5" height="34" rx="1.5"/>
        <rect x="9" y="10" width="23" height="5" rx="1.5"/>
        <rect x="12" y="20" width="17" height="4" rx="1.5"/>
        <rect x="15" y="28" width="14" height="3" rx="1.5" transform="rotate(-15 22 30)"/>
      </svg>
    ),
  },
  {
    name: "Secular",
    color: "#475569",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" width="30" height="30">
        {/* Atom / humanist symbol */}
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none"/>
        <ellipse cx="20" cy="20" rx="14" ry="5"/>
        <ellipse cx="20" cy="20" rx="14" ry="5" transform="rotate(60 20 20)"/>
        <ellipse cx="20" cy="20" rx="14" ry="5" transform="rotate(120 20 20)"/>
      </svg>
    ),
  },
  {
    name: "Rastafari",
    color: "#16a34a",
    svg: (
      <svg viewBox="0 0 40 40" fill="currentColor" width="30" height="30">
        {/* Lion of Judah simplified — star of David with lion suggestion */}
        <polygon points="20,5 23,14 32,14 25,20 28,29 20,24 12,29 15,20 8,14 17,14" fill="currentColor"/>
        <circle cx="20" cy="20" r="4" fill="white"/>
      </svg>
    ),
  },
];

export default function ReligionOrbit() {
  const count = SYMBOLS.length;
  const radius = 290;

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
              animationDelay: `${-(i / count) * 32}s`,
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
