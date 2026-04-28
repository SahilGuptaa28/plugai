// 'use client'

// import { motion } from "framer-motion"
// import Link from "next/link"
// import { useSession } from "next-auth/react"

// export default function CTA() {
//   const { data: session, status } = useSession()

//   if (status === "loading") return null

//   return (
//     <section className="relative bg-black text-white overflow-hidden py-32">

//       {/* 🔵 Background Glow */}
//       <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-150px] left-[-150px]" />
//       <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

//       {/* Grid */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

//       <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

//         {/* 🔥 Headline */}
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-4xl md:text-6xl font-bold leading-tight"
//         >
//           Embed AI into your website{" "}
//           <span className="text-blue-400 block">with just one script</span>
//         </motion.h2>

//         {/* 💡 Subtext */}
//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto"
//         >
//           Copy one script. Your AI chatbot is live in seconds.
//         </motion.p>

//         {/* 🚀 Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-10"
//         >
//           <Link href={session ? "/dashboard" : "/register"}>
//             <button className="px-8 py-4 rounded-full bg-white text-black font-medium text-lg shadow-lg transition hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
//               {session ? "Open Dashboard →" : "Get Started →"}
//             </button>
//           </Link>
//         </motion.div>

//         {/* 🧠 Trust line */}
//         <p className="mt-6 text-sm text-zinc-500 tracking-wide">
//           No credit card required
//         </p>

//       </div>
//     </section>
//   )
// }
'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function CTA() {
  const { data: session, status } = useSession()

  if (status === "loading") return null

  return (
    <section className="relative bg-black text-white overflow-hidden py-32">

      {/* Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Free to get started
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Embed AI into your website{" "}
          <span className="text-blue-400 block mt-2">with just one script</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed"
        >
          Copy one script. Your AI chatbot is live in seconds. No code, no complexity, no credit card.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-8 mt-10"
        >
          {[
            { value: "2 min", label: "Setup time" },
            { value: "24/7", label: "AI support" },
            { value: "0", label: "Code needed" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-blue-400">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-10 space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/dashboard" : "/register"}>
              <button className="px-8 py-3.5 rounded-full bg-white text-black font-medium text-base shadow-lg transition hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                {session ? "Open Dashboard →" : "Get Started Free →"}
              </button>
            </Link>
            <Link href="/dashboard/docs">
              <button className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition">
                Read the Docs
              </button>
            </Link>
          </div>

          <p className="text-sm text-zinc-500">
            No credit card required · Setup in under 2 minutes · Cancel anytime
          </p>
        </motion.div>

      </div>
    </section>
  )
}