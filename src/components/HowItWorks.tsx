'use client'

import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create your chatbot",
      desc: "Set up your AI assistant in seconds — no setup, no complexity, no credit card.",
      icon: "🤖",
      stat: "30s",
      statLabel: "To create",
    },
    {
      step: "02",
      title: "Train with your data",
      desc: "Add your FAQs, pricing, and policies — AI learns your business automatically.",
      icon: "📚",
      stat: "100%",
      statLabel: "Your knowledge",
    },
    {
      step: "03",
      title: "Go live instantly",
      desc: "Embed a single script tag and launch your chatbot on any website.",
      icon: "🚀",
      stat: "1 line",
      statLabel: "To embed",
    },
  ]

  return (
    <section id="howItWorks" className="relative bg-black text-white overflow-hidden py-32">

      {/* Background */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Simple 3-step process
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            How it works
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Build and launch your AI chatbot in just a few simple steps.
          </p>
        </motion.div>

        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" style={{ top: '54%' }} />

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center overflow-hidden transition"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition" />

              {/* Step number */}
              <div className="relative z-10 text-blue-400 text-sm font-mono font-semibold mb-4">
                {item.step}
              </div>

              {/* Icon */}
              <div className="relative z-10 mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-2xl mb-5 group-hover:bg-white/20 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-semibold mb-2 tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-zinc-400 text-sm leading-relaxed mb-5">
                {item.desc}
              </p>

              {/* Stat */}
              <div className="relative z-10 inline-flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xl font-bold text-blue-400">{item.stat}</span>
                <span className="text-xs text-zinc-500">{item.statLabel}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}