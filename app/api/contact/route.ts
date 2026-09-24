import { NextResponse } from "next/server";
import { profile } from "@/data/portfolio";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Message delivery is not configured yet. Please email directly instead." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const fields = payload as Record<string, unknown>;
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const subject = typeof fields.subject === "string" ? fields.subject.trim() : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";

  if (
    !name || name.length > 120 ||
    !emailPattern.test(email) || email.length > 254 ||
    !subject || subject.length > 180 ||
    !message || message.length > 10000
  ) {
    return NextResponse.json({ error: "Please complete each field and check the email address." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [profile.email],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Your message could not be sent right now. Please try again or email directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again or email directly." },
      { status: 502 },
    );
  }
}
