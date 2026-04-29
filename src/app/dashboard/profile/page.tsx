"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()

  const [userData, setUserData] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  // 🔥 Fetch latest user from DB
  useEffect(() => {
    if (!session?.user?.id) return

    fetch("/api/user")
      .then(res => res.json())
      .then(data => {
        setUserData(data)
        setLoadingUser(false)
      })
      .catch(() => setLoadingUser(false))
  }, [session])

  // Loading state
  if (status === "loading" || loadingUser) {
    return (
      <div className="text-white text-center py-20">
        Loading profile...
      </div>
    )
  }

  // Not logged in
  if (!session) {
    return (
      <div className="text-white text-center py-20">
        You are not logged in.
      </div>
    )
  }

  // ✅ Use DB data first, fallback to session
  const user = userData || session.user

  // ✅ PLAN FEATURES
  const planFeatures =
    user?.plan === "pro"
      ? [
        { label: "Chatbots", value: "5 bots" },
        { label: "Messages", value: "5000 / mo" },
        { label: "Knowledge", value: "Expanded" },
        { label: "Support", value: "Priority" },
      ]
      : user?.plan === "business"
        ? [
          { label: "Chatbots", value: "Unlimited" },
          { label: "Messages", value: "Unlimited" },
          { label: "Knowledge", value: "Advanced" },
          { label: "Support", value: "Dedicated" },
        ]
        : [
          { label: "Chatbots", value: "1 bot" },
          { label: "Messages", value: "100 / mo" },
          { label: "Knowledge", value: "Limited" },
          { label: "Support", value: "Community" },
        ]

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
            className="w-20 h-20 rounded-2xl border border-white/10"
            onError={(e) => {
              e.currentTarget.src =
                "https://ui-avatars.com/api/?name=" + (user?.name || "User")
            }}
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl font-bold text-blue-400">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-white/50 text-sm">{user?.email}</p>

          {/* Credits */}
          <p className="text-white/50 text-sm">
            Credits: {user?.credits ?? 0}
          </p>

          {/* Plan badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs mt-2">
            {(user?.plan || "free").toUpperCase()} Plan
          </div>
        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold">Account Details</h2>

        <div className="space-y-3">
          {[
            { label: "Full Name", value: user?.name },
            { label: "Email Address", value: user?.email },
            { label: "Account Type", value: "Google OAuth" },
            { label: "Plan", value: (user?.plan || "free").toUpperCase() },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-3 border-b border-white/5"
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
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <p className="text-white/50 text-sm">
              You are on the {user?.plan || "free"} plan
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">
              {user?.plan === "pro"
                ? "₹999"
                : user?.plan === "business"
                  ? "₹2999"
                  : "₹0"}
            </div>
            <div className="text-xs text-zinc-500">/ month</div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {planFeatures.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="text-xs text-white/40">{item.label}</div>
              <div className="text-sm font-medium text-white">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Button */}
        {user?.plan === "free" && (
          <Link
            href="/dashboard/pricing"
            className="flex justify-center w-full px-5 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition text-sm"
          >
            Upgrade to Pro →
          </Link>
        )}
        {user?.plan === "pro" && (
          <Link
            href="/dashboard/pricing"
            className="flex justify-center w-full px-5 py-3 bg-purple-500/20 border border-purple-400/30 text-purple-300 rounded-full font-medium hover:bg-purple-500/30 transition text-sm"
          >
            Upgrade to Business →
          </Link>
        )}
      </div>

      {/* SIGN OUT */}
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
 