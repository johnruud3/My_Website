import OpenAI from "openai";
import { NextResponse } from "next/server";
import { buildSystemPrompt, type ChatLocale } from "../../lib/chatKnowledge";

export const runtime = "nodejs";

type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

type ChatRequestBody = {
  messages?: IncomingMessage[];
  locale?: ChatLocale;
};

const MAX_USER_CHARS = 500;
const MAX_HISTORY = 8;
const MAX_REQUESTS = 20;
const WINDOW_MS = 10 * 60 * 1000;

type RateBucket = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateBucket>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.count >= MAX_REQUESTS) return true;

  bucket.count += 1;
  rateLimitStore.set(ip, bucket);
  return false;
}

function sanitizeMessages(messages: IncomingMessage[]): IncomingMessage[] {
  return messages
    .filter(
      (msg) =>
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        msg.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((msg) => ({
      role: msg.role,
      content:
        msg.role === "user"
          ? msg.content.trim().slice(0, MAX_USER_CHARS)
          : msg.content.trim().slice(0, 2000),
    }));
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many messages right now. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chat is temporarily unavailable." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as ChatRequestBody;
    const locale: ChatLocale = body.locale === "en" ? "en" : "no";
    const messages = sanitizeMessages(body.messages ?? []);

    if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
      return NextResponse.json(
        { error: "Please send a valid message." },
        { status: 400 },
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 250,
      messages: [
        { role: "system", content: buildSystemPrompt(locale) },
        ...messages,
      ],
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      (locale === "no"
        ? "Beklager, jeg fikk ikke til å svare akkurat nå. Prøv igjen, eller send e-post til johnruud@hotmail.no."
        : "Sorry, I couldn't reply just now. Please try again, or email johnruud@hotmail.no.");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chat]", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while chatting. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
