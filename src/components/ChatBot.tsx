"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm Ava 👋 I help businesses like yours get more clients online. What's your main goal right now — more traffic, more conversions, or launching a new product?",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...next, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const { text } = JSON.parse(data);
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: updated[updated.length - 1].content + text,
              };
              return updated;
            });
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again or contact us directly on WhatsApp.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // Render message content with clickable links
  function renderContent(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline text-[#97c121] break-all">
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-32px)] max-w-sm flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-black">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-950 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#1b4fd8,#9b27f9)" }}>
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-none">Ava</p>
              <p className="text-white/30 text-xs mt-0.5">Inmotion Assistant · Online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/30 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ maxHeight: 360 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-white text-black rounded-br-sm"
                      : "bg-zinc-900 text-white/80 rounded-bl-sm border border-white/[0.06]"
                  }`}
                >
                  {m.content ? renderContent(m.content) : (
                    <span className="flex gap-1 items-center text-white/30">
                      <Loader2 size={14} className="animate-spin" /> typing…
                    </span>
                  )}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === "" && null}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/[0.06] bg-zinc-950 flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything…"
              disabled={loading}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors disabled:opacity-30"
              aria-label="Send"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button — above mobile bottom bar */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        style={{ background: "linear-gradient(135deg,#1b4fd8,#9b27f9)" }}
      >
        {open ? <X size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
      </button>
    </>
  );
}
