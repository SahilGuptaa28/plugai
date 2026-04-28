'use client'

import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      title: "Instant AI Responses",
      desc: "Your chatbot replies instantly using AI — no delays, no waiting, just answers.",
      icon: "⚡",
      stat: "< 1s",
      statLabel: "Response time",
    },
    {
      title: "Fully Customizable",
      desc: "Match your chatbot with your brand colors, name, and greeting style.",
      icon: "🎨",
      stat: "100%",
      statLabel: "Your branding",
    },
    {
      title: "One-Line Integration",
      desc: "Copy & paste a single script tag and go live instantly on any website.",
      icon: "🔌",
      stat: "1 line",
      statLabel: "To integrate",
    },
    {
      title: "Train with Your Data",
      desc: "Add your FAQs, pricing, policies — AI responds only based on your knowledge.",
      icon: "📚",
      stat: "0%",
      statLabel: "Hallucination",
    },
  ]

  return (
    <section id="features" className="relative bg-black text-white overflow-hidden py-32">

      {/* Background */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Why PlugAI
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="text-blue-400">build smarter chatbots</span>
          </h2>

          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            Simple, powerful, and designed for modern websites.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />

              {/* Top row: icon + stat */}
              <div className="relative z-10 flex items-start justify-between mb-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-2xl group-hover:bg-white/20 transition">
                  {feature.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{feature.stat}</div>
                  <div className="text-xs text-zinc-500">{feature.statLabel}</div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Bottom border accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition" />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}