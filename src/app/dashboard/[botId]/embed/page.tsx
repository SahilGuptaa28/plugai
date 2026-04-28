import connectDb from "@/lib/db";
import Chatbot from "@/models/chatbotModel";
import mongoose from "mongoose";
import EmbedSection from "@/components/embedSection";
import Link from "next/link";

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ botId: string }>;
}) {
  const { botId } = await params;

  if (!mongoose.Types.ObjectId.isValid(botId)) {
    return (
      <div className="text-white flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-sm">
        <span>❌</span> Invalid Bot ID
      </div>
    );
  }

  await connectDb();
  const bot = await Chatbot.findById(botId);

  if (!bot) {
    return (
      <div className="text-white flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-sm">
        <span>❌</span> Bot not found
      </div>
    );
  }

  if (!bot.supportEmail?.trim() || !bot.knowledge?.trim()) {
    return (
      <div className="text-white max-w-4xl mx-auto py-8 space-y-6">

        <Link href={`/dashboard/${botId}`} className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition">
          ← Back
        </Link>

        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-md text-center bg-white/5 border border-yellow-500/20 rounded-2xl p-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-400/20 flex items-center justify-center text-3xl mx-auto">
              ⚠️
            </div>
            <h2 className="text-xl font-semibold">Setup Required</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Please add your support email and knowledge base before accessing the embed code.
            </p>
            <Link
              href={`/dashboard/${botId}`}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition"
            >
              Complete Setup →
            </Link>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="text-white max-w-4xl mx-auto py-8 space-y-8">

      {/* HEADER */}
      <div className="space-y-4">
        <Link href={`/dashboard/${botId}`} className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition">
          ← Back to {bot.name}
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-400/30 bg-green-400/10 text-green-400 text-sm font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ready to embed
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Embed Your Bot</h1>
          <p className="text-white/50 text-sm mt-2">
            Copy the script below and paste it into your website to go live.
          </p>
        </div>
      </div>

      {/* STEPS */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { step: "01", title: "Copy the script", desc: "Use the embed code generated below." },
          { step: "02", title: "Paste in HTML", desc: "Add it before the closing </body> tag." },
          { step: "03", title: "Go live", desc: "Refresh your site — your bot is ready." },
        ].map((item) => (
          <div key={item.step} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
            <div className="text-blue-400 text-xs font-mono font-semibold">{item.step}</div>
            <div className="font-semibold text-sm text-white">{item.title}</div>
            <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* EMBED SECTION */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <EmbedSection
          botId={botId}
          botName={bot.name}
          supportEmail={bot.supportEmail}
          knowledge={bot.knowledge}
        />
      </div>

      {/* FOOTER */}
      <div className="pt-2 border-t border-white/10 text-xs text-white/30 flex items-center justify-between">
        <span>Plug<span className="text-blue-400">AI</span> — AI chatbot for your website</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

    </div>
  );
}