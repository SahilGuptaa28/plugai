"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full bottom-[-200px] left-[-100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 lg:py-20">

        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* BRAND — takes 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon.svg" alt="PlugAI" width={30} height={30} className="shrink-0" />
              <h1 className="text-2xl font-semibold tracking-tight leading-none">
                Plug<span className="text-blue-400">AI</span>
              </h1>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Embed AI into your website with one script.
              Build smarter customer experiences in minutes.
            </p>

            {/* Mini stats */}
            <div className="flex gap-5 pt-2">
              {[
                { value: "2 min", label: "Setup" },
                { value: "24/7", label: "Uptime" },
                { value: "Free", label: "To start" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-sm font-bold text-blue-400">{s.value}</div>
                  <div className="text-xs text-zinc-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* LINKS — 3 cols */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-10">

            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Product</h3>
              <div className="space-y-3 text-sm text-zinc-500">
                <Link href="/dashboard" className="block hover:text-white transition">Dashboard</Link>
                <Link href="/dashboard/docs" className="block hover:text-white transition">Documentation</Link>
                <Link href="/dashboard/pricing" className="block hover:text-white transition">Pricing</Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Resources</h3>
              <div className="space-y-3 text-sm text-zinc-500">
                <Link href="/dashboard/docs" className="block hover:text-white transition">Guides</Link>
                <Link href="/dashboard/docs" className="block hover:text-white transition">API Docs</Link>
                <Link href="/dashboard/about" className="block hover:text-white transition">Support</Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Company</h3>
              <div className="space-y-3 text-sm text-zinc-500">
                <Link href="/dashboard/about" className="block hover:text-white transition">About</Link>
                <span className="block hover:text-white cursor-pointer transition">Twitter</span>
                <span className="block hover:text-white cursor-pointer transition">GitHub</span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Plug<span className="text-blue-400">AI</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-zinc-500">All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  )
}