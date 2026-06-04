"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";

/* ------------------------------------------------------------------ *
 * Types & storage
 * ------------------------------------------------------------------ */

type Mood = "great" | "good" | "ok" | "low" | "";

interface DayEntry {
  date: string; // YYYY-MM-DD
  steps: number;
  sleep: number; // hours
  water: number; // glasses
  weight: number; // kg
  mood: Mood;
}

interface Profile {
  name: string;
  goalSteps: number;
  goalSleep: number;
  goalWater: number;
}

interface AppData {
  profile: Profile;
  days: Record<string, DayEntry>; // keyed by date
}

const STORAGE_KEY = "quietworld.dashboard.v1";

const DEFAULT_PROFILE: Profile = {
  name: "",
  goalSteps: 8000,
  goalSleep: 8,
  goalWater: 8,
};

function todayKey(): string {
  // Local date as YYYY-MM-DD
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function emptyDay(date: string): DayEntry {
  return { date, steps: 0, sleep: 0, water: 0, weight: 0, mood: "" };
}

function loadData(): AppData {
  if (typeof window === "undefined")
    return { profile: DEFAULT_PROFILE, days: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { profile: DEFAULT_PROFILE, days: {} };
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      profile: { ...DEFAULT_PROFILE, ...(parsed.profile ?? {}) },
      days: parsed.days ?? {},
    };
  } catch {
    return { profile: DEFAULT_PROFILE, days: {} };
  }
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

type Tab = "today" | "trends" | "plan";

export default function Dashboard() {
  const [data, setData] = useState<AppData>({
    profile: DEFAULT_PROFILE,
    days: {},
  });
  const [tab, setTab] = useState<Tab>("today");
  const [loaded, setLoaded] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const today = todayKey();

  // Load once on mount (client only).
  useEffect(() => {
    setData(loadData());
    setLoaded(true);
  }, []);

  // Persist whenever data changes (after initial load).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedFlash(true);
      const t = setTimeout(() => setSavedFlash(false), 1200);
      return () => clearTimeout(t);
    } catch {
      /* storage full / disabled — ignore */
    }
  }, [data, loaded]);

  const day = data.days[today] ?? emptyDay(today);

  function updateDay(patch: Partial<DayEntry>) {
    setData((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [today]: { ...emptyDay(today), ...prev.days[today], ...patch },
      },
    }));
  }

  function updateProfile(patch: Partial<Profile>) {
    setData((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }

  if (!loaded) {
    return <div className="dash-loading">Loading your dashboard…</div>;
  }

  return (
    <div className="dash">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-inner">
          <div className="dash-brand">
            <span className="dash-logo">QW</span>
            <span className="dash-brand-name">QuietWorld</span>
          </div>
          <a href="/" className="dash-exit" aria-label="Back to website">
            x
          </a>
        </div>
        <div className="dash-greeting">
          <h1>
            {greeting()}
            {data.profile.name ? `, ${data.profile.name}` : ""}.
          </h1>
          <p className={`dash-saved ${savedFlash ? "show" : ""}`}>
            {savedFlash ? "✓ Saved to this device" : "Saved on this device"}
          </p>
        </div>
      </header>

      <main className="dash-main">
        {tab === "today" && (
          <TodayTab
            day={day}
            profile={data.profile}
            onChange={updateDay}
            onProfile={updateProfile}
          />
        )}
        {tab === "trends" && (
          <TrendsTab days={data.days} profile={data.profile} />
        )}
        {tab === "plan" && <PlanTab name={data.profile.name} />}
      </main>

      {/* Bottom tab nav */}
      <nav className="dash-tabs">
        <button
          className={tab === "today" ? "active" : ""}
          onClick={() => setTab("today")}
        >
          <span className="dash-tab-ico">◎</span>Today
        </button>
        <button
          className={tab === "trends" ? "active" : ""}
          onClick={() => setTab("trends")}
        >
          <span className="dash-tab-ico">&#9650;</span>Trends
        </button>
        <button
          className={tab === "plan" ? "active" : ""}
          onClick={() => setTab("plan")}
        >
          <span className="dash-tab-ico">&#9632;</span>My plan
        </button>
      </nav>
    </div>
  );
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/* ------------------------------------------------------------------ *
 * Today tab — editable trackers
 * ------------------------------------------------------------------ */

function TodayTab({
  day,
  profile,
  onChange,
  onProfile,
}: {
  day: DayEntry;
  profile: Profile;
  onChange: (p: Partial<DayEntry>) => void;
  onProfile: (p: Partial<Profile>) => void;
}) {
  const moods: { key: Mood; label: string; emoji: string }[] = [
    { key: "great", label: "Great", emoji: ":D" },
    { key: "good", label: "Good", emoji: ":)" },
    { key: "ok", label: "Okay", emoji: ":|" },
    { key: "low", label: "Low", emoji: ":(" },
  ];

  return (
    <div className="dash-cards">
      {!profile.name && (
        <div className="dash-card dash-card-intro">
          <label className="dash-field">
            <span>What should we call you?</span>
            <input
              type="text"
              placeholder="Your first name"
              value={profile.name}
              onChange={(e) => onProfile({ name: e.target.value })}
            />
          </label>
        </div>
      )}

      {/* Steps */}
      <Stepper
        icon="steps"
        title="Steps"
        unit="steps"
        value={day.steps}
        step={500}
        max={50000}
        goal={profile.goalSteps}
        onChange={(v) => onChange({ steps: v })}
      />

      {/* Sleep */}
      <Stepper
        icon="sleep"
        title="Sleep"
        unit="hours"
        value={day.sleep}
        step={0.5}
        max={16}
        goal={profile.goalSleep}
        decimals={1}
        onChange={(v) => onChange({ sleep: v })}
      />

      {/* Water */}
      <Stepper
        icon="water"
        title="Water"
        unit="glasses"
        value={day.water}
        step={1}
        max={20}
        goal={profile.goalWater}
        onChange={(v) => onChange({ water: v })}
      />

      {/* Weight */}
      <div className="dash-card">
        <div className="dash-card-head">
          <span className="dash-card-ico dash-ico-text">kg</span>
          <span className="dash-card-title">Weight</span>
        </div>
        <div className="dash-weight">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={400}
            value={day.weight || ""}
            placeholder="—"
            onChange={(e) => onChange({ weight: Number(e.target.value) || 0 })}
          />
          <span className="dash-weight-unit">kg</span>
        </div>
      </div>

      {/* Mood */}
      <div className="dash-card">
        <div className="dash-card-head">
          <span className="dash-card-ico dash-ico-text">mood</span>
          <span className="dash-card-title">Mood today</span>
        </div>
        <div className="dash-moods">
          {moods.map((m) => (
            <button
              key={m.key}
              className={`dash-mood ${day.mood === m.key ? "active" : ""}`}
              onClick={() =>
                onChange({ mood: day.mood === m.key ? "" : m.key })
              }
            >
              <span className="dash-mood-emoji">{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stepper({
  icon,
  title,
  unit,
  value,
  step,
  max,
  goal,
  decimals = 0,
  onChange,
}: {
  icon: string;
  title: string;
  unit: string;
  value: number;
  step: number;
  max: number;
  goal: number;
  decimals?: number;
  onChange: (v: number) => void;
}) {
  const pct = goal > 0 ? Math.min(100, Math.round((value / goal) * 100)) : 0;
  const fmt = (n: number) =>
    decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
  const clamp = (n: number) => Math.max(0, Math.min(max, n));

  return (
    <div className="dash-card">
      <div className="dash-card-head">
        <span className="dash-card-ico dash-ico-text">{icon}</span>
        <span className="dash-card-title">{title}</span>
        <span className="dash-card-goal">Goal {fmt(goal)}</span>
      </div>
      <div className="dash-stepper">
        <button
          className="dash-step-btn"
          onClick={() => onChange(clamp(value - step))}
          aria-label={`Decrease ${title}`}
        >
          −
        </button>
        <div className="dash-step-value">
          <strong>{fmt(value)}</strong>
          <span>{unit}</span>
        </div>
        <button
          className="dash-step-btn"
          onClick={() => onChange(clamp(value + step))}
          aria-label={`Increase ${title}`}
        >
          +
        </button>
      </div>
      <div className="dash-progress">
        <div className="dash-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="dash-progress-label">{pct}% of goal</div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Trends tab — last 7 days
 * ------------------------------------------------------------------ */

function TrendsTab({
  days,
  profile,
}: {
  days: Record<string, DayEntry>;
  profile: Profile;
}) {
  const last7 = lastNDates(7);
  const entries = last7.map((d) => days[d] ?? emptyDay(d));

  const totalSteps = entries.reduce((s, e) => s + e.steps, 0);
  const avgSleep =
    entries.filter((e) => e.sleep > 0).length > 0
      ? entries.reduce((s, e) => s + e.sleep, 0) /
        entries.filter((e) => e.sleep > 0).length
      : 0;
  const daysLogged = entries.filter(
    (e) => e.steps || e.sleep || e.water || e.weight || e.mood,
  ).length;

  return (
    <div className="dash-cards">
      <div className="dash-card dash-summary">
        <div className="dash-sum-item">
          <div className="dash-sum-num">{totalSteps.toLocaleString()}</div>
          <div className="dash-sum-label">steps this week</div>
        </div>
        <div className="dash-sum-item">
          <div className="dash-sum-num">{avgSleep ? avgSleep.toFixed(1) : "—"}</div>
          <div className="dash-sum-label">avg hrs sleep</div>
        </div>
        <div className="dash-sum-item">
          <div className="dash-sum-num">{daysLogged}/7</div>
          <div className="dash-sum-label">days logged</div>
        </div>
      </div>

      <BarChart
        title="Steps — last 7 days"
        goal={profile.goalSteps}
        data={entries.map((e) => ({ label: shortDay(e.date), value: e.steps }))}
      />
      <BarChart
        title="Sleep — last 7 days"
        goal={profile.goalSleep}
        unit="h"
        data={entries.map((e) => ({ label: shortDay(e.date), value: e.sleep }))}
      />
      <BarChart
        title="Water — last 7 days"
        goal={profile.goalWater}
        data={entries.map((e) => ({ label: shortDay(e.date), value: e.water }))}
      />
    </div>
  );
}

function BarChart({
  title,
  data,
  goal,
  unit = "",
}: {
  title: string;
  data: { label: string; value: number }[];
  goal: number;
  unit?: string;
}) {
  const max = Math.max(goal, ...data.map((d) => d.value), 1);
  return (
    <div className="dash-card">
      <div className="dash-card-head">
        <span className="dash-card-title">{title}</span>
      </div>
      <div className="dash-chart">
        {data.map((d, i) => (
          <div className="dash-bar-col" key={i}>
            <div className="dash-bar-track">
              <div
                className={`dash-bar ${d.value >= goal && d.value > 0 ? "hit" : ""}`}
                style={{ height: `${Math.round((d.value / max) * 100)}%` }}
                title={`${d.value}${unit}`}
              />
            </div>
            <div className="dash-bar-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Plan tab — QuietWorld subscription & coverage
 * ------------------------------------------------------------------ */

const CoverageIcons: Record<string, React.ReactNode> = {
  funeral: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M12 2C9 2 7 4 7 7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7c0-3-2-5-5-5z"/>
      <line x1="12" y1="7" x2="12" y2="14"/><line x1="9" y1="10" x2="15" y2="10"/>
    </svg>
  ),
  legal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>
    </svg>
  ),
  debt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
      <path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2-2.5 2.5V15"/>
    </svg>
  ),
  transport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M5 17H3v-5l2-5h13l3 5v5h-2"/>
      <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
      <line x1="9" y1="17" x2="15" y2="17"/>
    </svg>
  ),
};

function PlanTab({ name }: { name: string }) {
  const coverage = [
    { icon: "funeral", label: "Funeral — your way", note: "Cremation, burial, service, paperwork" },
    { icon: "legal",   label: "Legal help",         note: "Will, POA, estate paperwork" },
    { icon: "debt",    label: "Debt navigation",    note: "$15,000 family runway + specialists" },
    { icon: "transport", label: "Transportation",   note: "Anywhere in Canada + repatriation" },
  ];

  return (
    <div className="dash-cards">
      <div className="dash-card dash-plan-hero">
        <div className="dash-plan-badge">QUIETWORLD SUBSCRIPTION</div>
        <div className="dash-plan-price">
          <span className="cur">$</span>
          <span className="num">15</span>
          <span className="per">/mo</span>
        </div>
        <div className="dash-plan-status">
          <span className="dash-dot" /> Active · rate locked for life
        </div>
        <div className="dash-plan-next">Next payment: 1st of next month</div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <span className="dash-card-title">What&apos;s covered</span>
        </div>
        <ul className="dash-coverage">
          {coverage.map((c) => (
            <li key={c.label}>
              <span className="dash-cov-ico">{CoverageIcons[c.icon]}</span>
              <div>
                <div className="dash-cov-label">{c.label}</div>
                <div className="dash-cov-note">{c.note}</div>
              </div>
              <span className="dash-cov-check">✓</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="dash-card dash-concierge">
        <div className="dash-card-head">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" style={{flexShrink:0}}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.37 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="dash-card-title">24/7 Concierge</span>
        </div>
        <p>
          One number for {name || "your family"} when it matters most. We handle
          the funeral home, casket, transport, paperwork — everything.
        </p>
        <a href="tel:+18554784569" className="dash-concierge-btn">
          Call · 1-855-478-4569
        </a>
        <a href="mailto:support@quiteworld.com" className="dash-concierge-btn" style={{marginTop: "8px", background: "#f8fafc", color: "var(--dash-ink)", border: "1px solid var(--dash-line)"}}>
          Email · support@quiteworld.com
        </a>
        <a href="/#plans" className="dash-link" style={{marginTop: "12px"}}>
          Manage subscription →
        </a>
      </div>

      <div className="dash-disclaimer">
        Demo data shown for preview. Your health entries are saved privately on
        this device only.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Date helpers
 * ------------------------------------------------------------------ */

function lastNDates(n: number): string[] {
  const out: string[] = [];
  const pad = (x: number) => String(x).padStart(2, "0");
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  }
  return out;
}

function shortDay(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][dt.getDay()];
}
