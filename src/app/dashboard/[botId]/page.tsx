import connectDb from "@/lib/db";
import Chatbot from "@/models/chatbotModel";
import mongoose from "mongoose";
import Link from "next/link";
import EditBotForm from "@/components/EditbotForm";
import DeleteBotButton from "@/components/DeleteButton";

export default async function BotPage({
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

  const isConfigured = !!bot.supportEmail?.trim() && !!bot.knowledge?.trim();

  return (
    <div className="text-white max-w-4xl mx-auto py-8 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-white/40 text-sm mb-1">Chatbot</p>
          <h1 className="text-3xl sm:text-4xl font-bold">{bot.name}</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${isConfigured ? "bg-green-400" : "bg-yellow-400"}`} />
            <span className="text-white/60">{isConfigured ? "Ready" : "Setup needed"}</span>
          </div>
          <DeleteBotButton botId={botId} />
        </div>
      </div>

      {/* SETUP PROGRESS */}
      {!isConfigured && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-4 flex items-start gap-3">
          <span className="text-yellow-400 text-lg shrink-0">⚠️</span>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Setup incomplete</p>
            <p className="text-white/50 text-xs mt-0.5">Add your support email and knowledge below to enable the embed code.</p>
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            label: "Support Email",
            done: !!bot.supportEmail?.trim(),
            desc: bot.supportEmail?.trim() || "Not added yet",
          },
          {
            label: "Knowledge Base",
            done: !!bot.knowledge?.trim(),
            desc: bot.knowledge?.trim() ? "Knowledge added ✓" : "Not added yet",
          },
        ].map((item) => (
          <div key={item.label} className={`bg-white/5 border rounded-xl p-4 flex items-start gap-3 ${item.done ? "border-green-400/20" : "border-white/10"}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${item.done ? "bg-green-400/20 text-green-400" : "bg-white/10 text-white/30"}`}>
              {item.done ? "✓" : "○"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="text-xs text-white/40 mt-0.5 truncate max-w-[200px]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT FORM */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-5">Bot Configuration</h2>
        <EditBotForm bot={JSON.parse(JSON.stringify(bot))} />
      </div>

      {/* EMBED CTA */}
      {isConfigured ? (
        <Link
          href={`/dashboard/${botId}/embed`}
          className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition"
        >
          Get Embed Code →
        </Link>
      ) : (
        <div className="space-y-2">
          <button
            disabled
            className="w-full text-center px-5 py-3.5 bg-white/5 border border-white/10 rounded-full text-white/30 cursor-not-allowed text-sm"
          >
            Complete setup to get embed code
          </button>
          <p className="text-xs text-white/40 text-center">
            Fill in support email and knowledge above to unlock
          </p>
        </div>
      )}

    </div>
  );
}