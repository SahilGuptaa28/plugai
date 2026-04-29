"use client";

import { useState } from "react";

export default function DocsPage() {
  const script = `<script src="https://yourdomain.com/chatbot.js" data-bot-id="YOUR_BOT_ID data-bot-mame="YOUR_BOT_NAME"></script>`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-white max-w-4xl mx-auto space-y-16 py-8">

      {/* HERO */}
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Developer Docs
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Plug<span className="text-blue-400">AI</span> Documentation
        </h1>
        <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
          Follow these simple steps to create and install your AI chatbot on your website in under 2 minutes.
        </p>
      </div>

      {/* QUICK START */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Quick Start</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "01", title: "Create your bot", desc: <>Go to your dashboard and click <span className="text-white font-medium">+ New Bot</span></> },
            { step: "02", title: "Add your knowledge", desc: <>Add your <span className="text-white">support email</span> and <span className="text-white">business knowledge</span></> },
            { step: "03", title: "Embed & go live", desc: <>Copy and paste the embed script into your website</> },
          ].map((item) => (
            <div key={item.step} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:border-blue-400/30 transition">
              <div className="text-blue-400 text-sm font-mono font-semibold">{item.step}</div>
              <div className="font-semibold text-white">{item.title}</div>
              <div className="text-white/60 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EMBED CODE */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Embed Script</h2>
        <div className="relative bg-black/60 border border-white/10 rounded-xl p-5 text-sm font-mono overflow-x-auto">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 text-xs bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition font-sans"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <code className="text-green-400 pr-20 block">{script}</code>
        </div>
        <p className="text-sm text-white/60 leading-relaxed">
          Paste the script just before the closing{" "}
          <code className="text-white bg-white/10 px-1.5 py-0.5 rounded">&lt;/body&gt;</code>{" "}
          tag in your HTML file (usually <span className="text-white">index.html</span>).
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: "🔌", title: "Script loads widget", desc: "A floating chatbot widget appears on your website automatically." },
            { icon: "📡", title: "Queries sent to PlugAI", desc: "User messages are securely sent to PlugAI servers in real time." },
            { icon: "🧠", title: "AI generates answers", desc: "Responses are generated based on your business knowledge only." },
            { icon: "📧", title: "Fallback to email", desc: "If no answer is found, users are directed to your support email." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-400/30 transition">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="font-semibold text-white">{item.title}</div>
                <div className="text-white/60 text-sm mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KNOWLEDGE GUIDE */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Add in Knowledge</h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 space-y-3">
          <p className="text-white/70 text-sm">To get the best AI responses, include:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Product or service details",
              "Pricing information",
              "Delivery timelines",
              "Refund and return policies",
              "Frequently asked questions",
              "Contact and support info",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TROUBLESHOOTING */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>
        <div className="space-y-3">
          {[
            { issue: "Chatbot not appearing", fix: "Make sure the script is placed before the closing </body> tag and the page is refreshed." },
            { issue: "Wrong or no answers", fix: "Ensure your bot has detailed knowledge added — the more context, the better the answers." },
            { issue: "Script not loading", fix: "Check your bot ID is correct and your website has an active internet connection." },
          ].map((item) => (
            <div key={item.issue} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-400/30 transition">
              <div className="font-semibold text-white text-sm">{item.issue}</div>
              <div className="text-white/60 text-sm mt-1">{item.fix}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <a href="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition">
          Go to Dashboard
        </a>
        <a href="/dashboard/about" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition">
          Learn About PlugAI
        </a>
      </div>


    </div>
  );
}