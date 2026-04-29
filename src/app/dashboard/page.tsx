"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
  import toast from "react-hot-toast"

export default function DashboardPage() {
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/bots")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setBots(data);
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  }, []);


async function handleCreateBot(e: React.FormEvent) {
  e.preventDefault()

  try {
    setLoadingCreate(true)

    const res = await fetch("/api/bots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    const data = await res.json()

    // ❌ Error handling
    if (!res.ok) {
      if (res.status === 403) {
        toast.error("You've reached your bot limit. Upgrade your plan 🚀")
      } else {
        toast.error(data.error || "Failed to create bot ❌")
      }
      return
    }

    // ✅ Success
    toast.success("Bot created successfully 🎉")

    setName("")
    setShowModal(false)

    router.push(`/dashboard/${data._id}`)

  } catch (err) {
    console.error(err)
    toast.error("Something went wrong ❌")
  } finally {
    setLoadingCreate(false)
  }
}

  return (
    <div className="text-white max-w-6xl mx-auto py-8 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Your Chatbots</h1>
          <p className="text-white/50 text-sm mt-1">Manage and deploy your AI assistants</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition"
        >
          + New Bot
        </button>
      </div>

      {/* STATS */}
      {!loading && bots.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: bots.length, label: "Total bots" },
            { value: "24/7", label: "Uptime" },
            { value: "AI", label: "Powered" },
            { value: "Live", label: "Status" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-3 text-white/50 text-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Loading your chatbots...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && bots.length === 0 && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-md text-center bg-white/5 border border-white/10 rounded-2xl p-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-3xl mx-auto">
              🤖
            </div>
            <h2 className="text-xl font-semibold">No chatbots yet</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Create your first AI chatbot and embed it into your website in minutes. No coding required.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition"
            >
              + Create your first bot
            </button>
          </div>
        </div>
      )}

      {/* BOTS GRID */}
      {!loading && bots.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bots.map((bot) => (
            <div
              key={bot._id}
              onClick={() => router.push(`/dashboard/${bot._id}`)}
              className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-400/30 hover:bg-white/10 transition cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                  {bot.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-white/30 group-hover:text-blue-400 transition">Edit →</span>
              </div>
              <div>
                <h2 className="font-semibold text-white">{bot.name}</h2>
                <p className="text-xs text-white/40 mt-1 line-clamp-2">
                  {bot.knowledge || "No knowledge added yet"}
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-white/40">Active</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-5">

            <div>
              <h2 className="text-lg font-semibold">Create New Chatbot</h2>
              <p className="text-white/50 text-sm mt-1">Give your bot a name to get started</p>
            </div>

            <form onSubmit={handleCreateBot} className="space-y-4">
              <input
                type="text"
                placeholder="e.g. Support Bot, Sales Assistant..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none text-sm placeholder:text-white/30 focus:border-blue-400/50 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-white/60 hover:bg-white/10 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingCreate}
                  className="px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition disabled:opacity-50"
                >
                  {loadingCreate ? "Creating..." : "Create Bot"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}