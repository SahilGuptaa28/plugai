'use client'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Script from 'next/script'
import PlugAIBot from './plugAI'

export default function HomePage() {
    const { data: session, status } = useSession()

    const texts = ["Customer Support 24/7", "Instant AI Responses", "Zero Code Required"]
    const [textIndex, setTextIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentText = texts[textIndex]
        let timeout: NodeJS.Timeout

        if (!isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText(currentText.slice(0, displayText.length + 1))
            }, 80)
        } else {
            timeout = setTimeout(() => {
                setDisplayText(currentText.slice(0, displayText.length - 1))
            }, 40)
        }

        if (!isDeleting && displayText === currentText) {
            timeout = setTimeout(() => setIsDeleting(true), 1500)
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
        }

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, textIndex])

    if (status === "loading") return null

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">

            {/* Background */}
            <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
            <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Navbar */}
           {/* Navbar */}
<div className="fixed top-0 left-0 right-0 z-50  backdrop-blur-xl ">
  <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
    <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2 h-full">
      <img src="/icon.svg" alt="PlugAI" width={30} height={30} className="shrink-0" />
      <h1 className="text-2xl font-semibold tracking-tight leading-none">
        Plug<span className="text-blue-400">AI</span>
      </h1>
    </Link>

    <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
      <a href="#features" className="hover:text-white transition">Features</a>
      <a href="#howItWorks" className="hover:text-white transition">How it works</a>
      <Link href="/dashboard/pricing" className="hover:text-white transition">Pricing</Link>
      <Link href="/dashboard/docs" className="hover:text-white transition">Docs</Link>
    </div>

    {session ? (
  <div className="flex items-center gap-3">

    {/* Dashboard Button */}
    <Link href="/dashboard">
      <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition">
        Dashboard →
      </button>
    </Link>

    {/* User Avatar */}
    <div className="relative group">
      {session.user?.image ? (
        <img
          src={session.user.image}
          className="w-9 h-9 rounded-full border border-white/20 cursor-pointer"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold cursor-pointer">
          {session.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition p-2 z-50">
        <Link href="/dashboard" className="block px-3 py-2 hover:bg-zinc-100 rounded-lg text-sm">
          Dashboard
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-3 py-2 hover:bg-zinc-100 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </div>

  </div>
) : (
  <div className="flex items-center gap-3">
    <Link href="/login">
      <button className="px-4 py-2 text-sm text-white/70 hover:text-white transition">
        Login
      </button>
    </Link>

    <Link href="/register">
      <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition">
        Get Started →
      </button>
    </Link>
  </div>
)}
  </div>
</div>

{/* Spacer to prevent content hiding under fixed navbar */}
<div className="h-16" />

            {/* HERO */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center pt-8 md:pt-10">

                {/* LEFT */}
                <div className="space-y-6">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Now in Beta — Free to try
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold leading-tight"
                    >
                        Plug <span className="text-blue-400">AI</span> into your website.
                        <span className="block text-3xl md:text-5xl text-blue-400 mt-4 min-h-[56px]">
                            {displayText}<span className="animate-pulse">|</span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 max-w-md leading-relaxed text-lg"
                    >
                        Embed an intelligent chatbot into your website in minutes.
                        No code. Fully customizable. Powered by your own knowledge.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-8 py-1"
                    >
                        {[
                            { value: "2 min", label: "Setup time" },
                            { value: "24/7", label: "AI support" },
                            { value: "0", label: "Code needed" },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="text-xl font-bold text-white">{s.value}</div>
                                <div className="text-xs text-zinc-500">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 flex-wrap"
                    >
                        <Link href={session ? "/dashboard" : "/register"}>
                            <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 hover:scale-105 transition shadow-lg">
                                {session ? "Open Dashboard →" : "Get Started Free →"}
                            </button>
                        </Link>
                        <a href="#features">
                            <button className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition">
                                See Features
                            </button>
                        </a>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs text-zinc-600"
                    >
                        No credit card required · Setup in under 2 minutes
                    </motion.p>

                </div>

                {/* RIGHT CHAT */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative flex justify-center items-center w-full px-4 mt-10 md:mt-0"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute z-30 -top-6 left-4 md:left-10 bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-sm border border-white/10"
                    >
                        Hello 👋
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                        className="absolute z-30 -bottom-8 right-4 md:right-10 bg-blue-500/20 backdrop-blur px-4 py-2 rounded-xl text-sm border border-white/10 max-w-[220px]"
                    >
                        Welcome to PlugAI
                    </motion.div>

                    {/* Chat Card */}
                    <div className="relative z-20 w-full max-w-[320px] md:max-w-[380px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl">

                        <div className="flex items-center gap-2 mb-4">
                            <img src="/icon.svg" alt="PlugAI" width={20} height={20} />
                            <span className="text-sm text-zinc-400">PlugAI Assistant</span>
                            <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Online
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <div className="bg-zinc-800 px-4 py-2 rounded-xl text-sm max-w-[80%] text-white">
                                    What are your pricing plans?
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-blue-500/20 border border-blue-400/10 px-4 py-2 rounded-xl text-sm max-w-[80%] text-white">
                                    Plans start from $9/month with full customization.
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-zinc-800 px-4 py-2 rounded-xl text-sm max-w-[80%] text-white">
                                    Can I try it free?
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-blue-500/20 border border-blue-400/10 px-4 py-2 rounded-xl text-sm max-w-[80%] text-white">
                                    Yes! Get started free — no credit card needed. 🎉
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-white/10 pt-3 flex items-center gap-2">
                            <span className="text-zinc-500 text-sm flex-1">Type a message...</span>
                            <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center text-blue-400 text-xs">↑</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* SOCIAL PROOF BAR */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative z-10 max-w-7xl mx-auto px-8 mt-20 pb-10"
            >
                <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    {[
                        { value: "500+", label: "Chatbots created" },
                        { value: "99.9%", label: "Uptime" },
                        { value: "< 1s", label: "Response time" },
                        { value: "4.9 ★", label: "User rating" },
                    ].map((s) => (
                        <div key={s.label}>
                            <div className="text-2xl font-bold text-blue-400">{s.value}</div>
                            <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}