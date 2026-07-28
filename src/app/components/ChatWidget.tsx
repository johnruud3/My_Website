"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";
import { useLocale } from "./LocaleProvider";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function RobotFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <circle cx="24" cy="6" r="2.2" fill="#34C1E3" />
      <path
        d="M24 8.2v4.2"
        stroke="#34C1E3"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="23" r="3.6" fill="#146C82" />
      <circle cx="31.5" cy="23" r="3.6" fill="#146C82" />
      <circle cx="17.7" cy="21.8" r="1.1" fill="white" />
      <circle cx="32.7" cy="21.8" r="1.1" fill="white" />
      <path
        d="M15.5 30c2.4 3.4 5.5 5 8.5 5s6.1-1.6 8.5-5"
        stroke="#34C1E3"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [bubbleIdle, setBubbleIdle] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const starterChips = [
    t("chat.chipContact"),
    t("chat.chipAbout"),
    t("chat.chipProjects"),
  ];

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open, error]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      setBubbleIdle(false);
      return;
    }

    const startIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setBubbleIdle(true), 5000);
    };

    startIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [open]);

  const handleBubbleActivity = () => {
    setBubbleIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setBubbleIdle(true), 5000);
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim().slice(0, 500);
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: makeId(), role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        setError(data.error || t("chat.error"));
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "assistant", content: data.reply as string },
      ]);
    } catch {
      setError(t("chat.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  if (!open) {
    return (
      <div
        className={styles.launcherWrap}
        onMouseEnter={handleBubbleActivity}
        onMouseLeave={handleBubbleActivity}
        onFocus={handleBubbleActivity}
      >
        <button
          type="button"
          className={`${styles.speechBubble} ${bubbleIdle ? styles.speechBubbleIdle : ""}`}
          onClick={() => setOpen(true)}
        >
          {t("chat.askMe")}
        </button>
        <button
          type="button"
          className={styles.launcher}
          onClick={() => setOpen(true)}
          aria-label={t("chat.open")}
        >
          <RobotFaceIcon className={styles.launcherIcon} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.panel} role="dialog" aria-label={t("chat.title")}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.title}>{t("chat.title")}</p>
          <p className={styles.subtitle}>{t("chat.subtitle")}</p>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setOpen(false)}
          aria-label={t("chat.close")}
        >
          ✕
        </button>
      </div>

      <div className={styles.messages} ref={listRef}>
        <div className={styles.assistantBlock}>
          <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
            {t("chat.welcome")}
          </div>
          <span className={styles.seenBadge} aria-hidden>
            <RobotFaceIcon className={styles.seenIcon} />
          </span>
        </div>

        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div
                key={msg.id}
                className={`${styles.bubble} ${styles.bubbleUser}`}
              >
                {msg.content}
              </div>
            );
          }

          return (
            <div key={msg.id} className={styles.assistantBlock}>
              <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                {msg.content}
              </div>
              <span className={styles.seenBadge} aria-hidden>
                <RobotFaceIcon className={styles.seenIcon} />
              </span>
            </div>
          );
        })}

        {loading && <p className={styles.typing}>{t("chat.thinking")}</p>}
        {error && (
          <div className={`${styles.bubble} ${styles.bubbleError}`}>{error}</div>
        )}
      </div>

      {messages.length === 0 && (
        <div className={styles.chips}>
          {starterChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={styles.chip}
              disabled={loading}
              onClick={() => void sendMessage(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <form className={styles.composer} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          maxLength={500}
          disabled={loading}
          aria-label={t("chat.placeholder")}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={loading || !input.trim()}
        >
          {t("chat.send")}
        </button>
      </form>
    </div>
  );
}
