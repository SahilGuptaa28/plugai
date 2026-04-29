'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Invalid email or password")
      setLoading(false)
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* Header */}
      <div className="absolute top-0 left-0 w-full px-6 py-5 flex items-center justify-between z-20">
        <Link href="/" className="text-white font-semibold text-lg tracking-tight">
          Plug<span className="text-blue-400">AI</span>
        </Link>

        <Link href="/" className="text-sm text-zinc-400 hover:text-white transition">
          Back to home
        </Link>
      </div>

      {/* Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]">

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight text-white text-center mb-8">
          Welcome back
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full mt-1 bg-transparent border-b border-zinc-600 focus:border-blue-400 outline-none py-2 text-white placeholder-zinc-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full mt-1 bg-transparent border-b border-zinc-600 focus:border-blue-400 outline-none py-2 text-white placeholder-zinc-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Primary Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-medium shadow-lg hover:bg-zinc-200 transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Continue →"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-700" />
            <span className="text-zinc-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-zinc-700" />
          </div>

          {/* Google Button (outlined style) */}
       <button
  type="button"
  onClick={() => {
    setLoadingGoogle(true)
    signIn("google", { callbackUrl: "/dashboard" })
  }}
  disabled={loadingGoogle}
  className={`w-full border border-zinc-300 dark:border-zinc-700 
  bg-white dark:bg-zinc-900 
  text-black dark:text-white 
  py-3 rounded-lg flex items-center justify-center gap-3 
  font-medium transition
  ${loadingGoogle ? "opacity-60 cursor-not-allowed" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}
  `}
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />

  {loadingGoogle ? "Continuing with Google..." : "Continue with Google"}
</button>

          {/* Register link */}
          <p className="text-sm text-zinc-400 text-center pt-2">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 hover:underline transition"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}