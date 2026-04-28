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

  // 🔥 CHECK CONFIG
  const isConfigured =
    supportEmail?.trim() && knowledge?.trim();

  const code = `<script src="http://localhost:3000/chatbot.js" data-bot-id="${botId}" data-bot-name="${botName}"></script>`;

  const handleCopy = () => {
    if (!isConfigured) return; // 🔒 block copy

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 space-y-6 w-full">

      {/* HEADER */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold">
          Embed Chatbot
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-1">
          Copy and paste this code before &lt;/body&gt;
        </p>
      </div>

      {/* 🚨 WARNING */}
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
          <code className="text-green-400 break-all whitespace-pre-wrap">
            {code}
          </code>
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
        <h3 className="text-xs sm:text-sm font-medium mb-3">
          Live Preview
        </h3>

        <div className="relative min-h-[320px] border border-white/10 rounded-lg p-4 bg-black/40 overflow-hidden">

          <div className="text-white/40 text-xs sm:text-sm">
            your-website.com
          </div>

          <div className="mt-6 text-white/30 text-xs sm:text-sm">
            Website content goes here...
          </div>

          {/* CHAT WIDGET */}
          <div
            className="
              absolute bottom-4
              left-4 right-4 mx-auto max-w-[280px]
              sm:left-auto sm:right-4 sm:mx-0 sm:w-[320px] sm:max-w-[320px]
            "
          >
            <div className="bg-white text-black rounded-xl shadow-xl overflow-hidden">

              <div className="bg-black text-white px-4 py-2 text-xs sm:text-sm flex justify-between items-center">
                <span>{botName || "Support"}</span>
                <span className="text-white/70 cursor-pointer">×</span>
              </div>

              <div className="p-3 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-3 py-2 rounded-lg max-w-[75%]">
                    Hi! How can I help you?
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-black text-white px-3 py-2 rounded-lg max-w-[75%]">
                    What is your pricing?
                  </div>
                </div>
              </div>

              <div className="border-t px-3 py-2 text-xs sm:text-sm text-gray-400">
                Type your message...
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}