
"use client";

import { useState } from "react";

type Props = {
  botId: string;
  botName: string;
  supportEmail?: string;
  knowledge?: string;
};

export default function EmbedSection({
  botId,
  botName,
  supportEmail,
  knowledge,
}: Props) {
  const [copied, setCopied] = useState(false);

  const isConfigured = supportEmail?.trim() && knowledge?.trim();

  const code = `<script src="http://localhost:3000/chatbot.js" data-bot-id="${botId}" data-bot-name="${botName}"></script>`;

  const handleCopy = () => {
    if (!isConfigured) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 space-y-6 w-full">

      {/* HEADER */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold">Embed Chatbot</h2>
        <p className="text-xs sm:text-sm text-white/60 mt-1">
          Copy and paste this code before &lt;/body&gt;
        </p>
      </div>

      {/* WARNING */}
      {!isConfigured && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm rounded-lg p-3">
          Please add <b>support email</b> and <b>knowledge</b> to enable embed.
        </div>
      )}

      {/* CODE BLOCK */}
      <div
        className={`relative bg-black border border-white/10 rounded-lg p-3 sm:p-4 pr-16 sm:pr-20 text-xs sm:text-sm font-mono overflow-x-auto ${
          !isConfigured && "opacity-50 pointer-events-none"
        }`}
      >
        <button
          onClick={handleCopy}
          disabled={!isConfigured}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xs bg-white/10 px-2 sm:px-3 py-1 rounded-md hover:bg-white/20 transition whitespace-nowrap disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className="overflow-x-auto">
          <code className="text-green-400 break-all whitespace-pre-wrap">{code}</code>
        </pre>
      </div>

      {/* STEPS */}
      <div className="text-xs sm:text-sm text-white/70 space-y-2">
        <p>1. Copy the embed script</p>
        <p>2. Paste it before the closing &lt;/body&gt; tag</p>
        <p>3. Reload your website</p>
      </div>

      {/* LIVE PREVIEW */}
      <div>
        <h3 className="text-xs sm:text-sm font-medium mb-3">Live Preview</h3>

        {/* Browser frame */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-white/10 bg-black/40">

          {/* Browser bar */}
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 min-w-0 bg-white/10 rounded px-2 py-0.5 text-[10px] text-white/40 truncate">
              your-website.com
            </div>
          </div>

          {/* Page body */}
          <div className="relative min-h-[420px] sm:min-h-[500px] p-4 overflow-hidden">

            {/* Skeleton page content */}
            <div className="space-y-2 w-full sm:w-1/2">
              <div className="h-2 w-2/3 rounded bg-white/10" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-5/6 rounded bg-white/10" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
            </div>

            {/* ── BOT CONTAINER ── */}
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">

              {/* ════ MOBILE BOT (< sm) — truly small, no transform ════ */}
              <div className="flex sm:hidden flex-col items-end gap-1.5" style={{ width: "42vw" }}>
                <div
                  className="w-full rounded-xl flex flex-col overflow-hidden"
                  style={{
                    background: "#09090b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {/* Mobile Header */}
                  <div
                    className="flex items-center justify-between px-2 py-1.5"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div className="flex items-center gap-1 min-w-0">
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-[6px]"
                        style={{
                          width: 20, height: 20, fontSize: 10,
                          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                        }}
                      >🤖</div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white leading-none truncate" style={{ fontSize: 8 }}>
                          {botName || "Support"}
                        </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span className="inline-block rounded-full flex-shrink-0" style={{ width: 4, height: 4, background: "#22c55e" }} />
                          <span style={{ fontSize: 7, color: "#22c55e" }}>Online</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        style={{
                          fontSize: 7, padding: "2px 5px", borderRadius: 5,
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#a1a1aa",
                        }}
                      >New</button>
                      <button
                        style={{
                          width: 14, height: 14, borderRadius: 4, fontSize: 8,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#a1a1aa",
                        }}
                      >✕</button>
                    </div>
                  </div>

                  {/* Mobile Messages */}
                  <div className="flex flex-col gap-1.5 p-1.5">
                    {/* AI 1 */}
                    <div className="flex items-end gap-1">
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-[5px]"
                        style={{ width: 14, height: 14, fontSize: 8, background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                      >🤖</div>
                      <div
                        style={{
                          fontSize: 8, lineHeight: 1.4,
                          padding: "4px 6px",
                          borderRadius: "8px 8px 8px 2px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#e4e4e7", maxWidth: "80%",
                        }}
                      >
                        Hi! I'm here to help with <strong>{botName || "Support"}</strong>. What would you like to know?
                      </div>
                    </div>
                    {/* User */}
                    <div className="flex justify-end">
                      <div
                        style={{
                          fontSize: 8, lineHeight: 1.4,
                          padding: "4px 6px",
                          borderRadius: "8px 8px 2px 8px",
                          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                          color: "white", maxWidth: "80%",
                        }}
                      >What is your pricing?</div>
                    </div>
                    {/* AI 2 */}
                    <div className="flex items-end gap-1">
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-[5px]"
                        style={{ width: 14, height: 14, fontSize: 8, background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                      >🤖</div>
                      <div
                        style={{
                          fontSize: 8, lineHeight: 1.4,
                          padding: "4px 6px",
                          borderRadius: "8px 8px 8px 2px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#e4e4e7", maxWidth: "80%",
                        }}
                      >We offer flexible plans starting from free!</div>
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div className="px-1.5 pb-1.5 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div
                      className="flex items-center gap-1"
                      style={{
                        padding: "3px 6px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span className="flex-1" style={{ fontSize: 7, color: "#52525b" }}>Ask me anything...</span>
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 16, height: 16, borderRadius: 5,
                          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                        }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-center mt-0.5" style={{ fontSize: 6, color: "#3f3f46" }}>
                      Powered by <span style={{ color: "#3b82f6" }}>PlugAI</span>
                    </p>
                  </div>
                </div>

                {/* Mobile floating button */}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: 28, height: 28,
                    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.5)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              </div>

              {/* ════ DESKTOP BOT (sm+) — original unchanged ════ */}
              <div className="hidden sm:flex flex-col items-end gap-2">
                <div
                  className="w-[320px] rounded-[18px] flex flex-col overflow-hidden"
                  style={{
                    background: "#09090b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 16px 60px rgba(0,0,0,0.8)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {/* Header */}
                  <div
                    className="flex-shrink-0 flex items-center justify-between px-3 py-2.5"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                      >🤖</div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white leading-none truncate max-w-[140px]">
                          {botName || "Support"}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                          <span className="text-[10px]" style={{ color: "#22c55e" }}>Online</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      <button
                        className="text-[10px] px-2 py-1 rounded-lg whitespace-nowrap"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#a1a1aa",
                        }}
                      >New Chat</button>
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-lg text-[11px] flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#a1a1aa",
                        }}
                      >✕</button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex flex-col gap-2.5 p-3">
                    <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] flex-shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>🤖</div>
                      <div className="text-[12px] leading-relaxed px-3 py-2 rounded-[14px] rounded-bl-[4px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#e4e4e7", maxWidth: "78%" }}>
                        Hi! I'm here to help with <strong>{botName || "Support"}</strong>. What would you like to know?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="text-[12px] leading-relaxed px-3 py-2 rounded-[14px] rounded-br-[4px] text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", maxWidth: "78%" }}>
                        What is your pricing?
                      </div>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] flex-shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>🤖</div>
                      <div className="text-[12px] leading-relaxed px-3 py-2 rounded-[14px] rounded-bl-[4px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#e4e4e7", maxWidth: "78%" }}>
                        We offer flexible plans starting from free. Check our pricing page for details!
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="px-3 pb-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <span className="flex-1 text-[12px]" style={{ color: "#52525b" }}>Ask me anything...</span>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-center mt-1.5" style={{ fontSize: "10px", color: "#3f3f46" }}>
                      Powered by <span style={{ color: "#3b82f6" }}>PlugAI</span>
                    </p>
                  </div>
                </div>

                {/* Desktop floating button */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                    boxShadow: "0 8px 32px rgba(99,102,241,0.5)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}