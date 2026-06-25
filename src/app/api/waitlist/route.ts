import { NextResponse } from "next/server";

/**
 * Saves a waitlist signup to Supabase via its REST API (no SDK needed).
 * Requires two server-only env vars:
 *   SUPABASE_URL                — e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY   — service_role key (server-side only, never exposed)
 *
 * If those aren't set yet, the route accepts the signup gracefully
 * (stored:false) so the form keeps working before the DB is wired up.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // DB not configured yet — don't block the user.
  if (!url || !key) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const row = {
    name,
    email,
    age: body.age ? Number(body.age) : null,
    gender: body.gender ? String(body.gender) : null,
    phone: body.phone ? String(body.phone) : null,
    address: body.address ? String(body.address) : null,
    city: body.city ? String(body.city) : null,
    postal: body.postal ? String(body.postal) : null,
    country: body.country ? String(body.country) : null,
  };

  try {
    const res = await fetch(`${url}/rest/v1/signups`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Supabase insert failed:", res.status, detail);
      // Still return ok so the user's flow isn't broken; we log for ourselves.
      return NextResponse.json({ ok: true, stored: false });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error("Waitlist save error:", e);
    return NextResponse.json({ ok: true, stored: false });
  }
}
