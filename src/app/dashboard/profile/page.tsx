"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function ProfilePage() {
  const { data: session, status } = useSession()

  // 🔄 Loading state
  if (status === "loading") {
    return (
      <div className="text-white text-center py-20">
        Loading profile...
      </div>
    )
  }

  // 🔒 Protect route
  if (!session) {
    return (
      <div className="text-white text-center py-20">
        You are not logged in.
      </div>
    )
  }

  const user = session.user

  return (
    <div className="text-white max-w-3xl mx-auto py-8 space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-white/40 text-sm mb-1">Account</p>
        <h1 className="text-3xl sm:text-4xl font-bold">Profile</h1>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {user?.image ? (
          <img
            src={user.image}
            alt="avatar"
            className="w-20 h-20 rounded-2xl border border-white/10 shrink-0"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png"
            }}
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-3xl font-bold text-blue-400 shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
          <p className="text-white/50 text-sm">{user?.email || "No email"}</p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Free Plan
          </div>
        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold">Account Details</h2>

        <div className="space-y-3">
          {[
            { label: "Full Name", value: user?.name || "—" },
            { label: "Email Address", value: user?.email || "—" },
            { label: "Account Type", value: "Google OAuth" },
            { label: "Plan", value: "Free" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <span className="text-white/50 text-sm">{item.label}</span>
              <span className="text-white text-sm font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PLAN */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <p className="text-white/50 text-sm mt-0.5">
              You are on the Free plan
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">$0</div>
            <div className="text-xs text-zinc-500">/ month</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Chatbots", value: "1 bot" },
            { label: "Messages", value: "100 / mo" },
            { label: "Knowledge", value: "Limited" },
            { label: "Support", value: "Community" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="text-xs text-white/40">{item.label}</div>
              <div className="text-sm font-medium text-white mt-0.5">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ FIXED BUTTON */}
        <Link
          href="/dashboard/pricing"
          className="flex items-center justify-center w-full px-5 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition text-sm"
        >
          Upgrade to Pro →
        </Link>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
        <p className="text-white/50 text-sm">
          Signing out will end your current session. Your bots and data will remain saved.
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-5 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/30 transition"
        >
          Sign Out
        </button>
      </div>

    </div>
  )
}