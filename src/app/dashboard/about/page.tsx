
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="text-white max-w-4xl mx-auto space-y-16 py-8 px-6">

      {/* HERO */}
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Now in Beta
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          About Plug<span className="text-blue-400">AI</span>
        </h1>

        <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
          PlugAI is a no-code AI chatbot builder that helps businesses
          provide instant, intelligent customer support — powered by their own knowledge.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: "2 min", label: "Setup time" },
          { value: "24/7", label: "AI support" },
          { value: "100%", label: "Your data" },
          { value: "0", label: "Code required" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
            <div className="text-sm text-white/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* MISSION */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 space-y-3">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-white/70 leading-relaxed text-base">
          Our goal is to make AI-powered customer support accessible to everyone —
          not just large enterprises. Instead of building complex systems, businesses
          can simply plug in their knowledge and instantly get a smart chatbot ready
          to assist users around the clock.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">
          How Plug<span className="text-blue-400">AI</span> Works
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { step: "01", title: "Create your chatbot", desc: "Sign up and create your first chatbot in seconds with zero configuration." },
            { step: "02", title: "Add your knowledge", desc: "Upload FAQs, pricing, policies — anything your customers ask about." },
            { step: "03", title: "Embed on your website", desc: "Copy one line of code and paste it into any website or platform." },
            { step: "04", title: "AI handles the rest", desc: "Your chatbot responds instantly, 24/7, based only on your data." },
          ].map((item) => (
            <div key={item.step} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:border-blue-400/30 transition">
              <div className="text-blue-400 text-sm font-mono font-semibold">{item.step}</div>
              <div className="font-semibold text-white">{item.title}</div>
              <div className="text-white/60 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Plug<span className="text-blue-400">AI</span>?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: "⚡", title: "No coding required", desc: "Built for non-technical founders and teams." },
            { icon: "🚀", title: "Fast setup", desc: "Go from signup to live chatbot in under 2 minutes." },
            { icon: "🌐", title: "Works anywhere", desc: "Embed on any website, landing page, or web app." },
            { icon: "🔒", title: "Controlled responses", desc: "AI only answers based on your approved knowledge." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-400/30 transition">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="font-semibold text-white">{item.title}</div>
                <div className="text-white/60 text-sm mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUILDER */}
      <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-xl font-bold text-blue-400 shrink-0">
          S
        </div>

        <div>
          <div className="text-white/50 text-sm mb-1">Built by</div>
          <div className="text-white font-semibold text-lg">Sahil Gupta</div>
          <div className="text-white/50 text-sm mt-1">
            Focused on creating simple and powerful AI tools for real-world use cases.
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
        >
          Learn More
        </Link>

      </div>

      {/* FOOTER */}
      <div className="pt-10 border-t border-white/10 text-sm text-white/40 text-center">
        PlugAI — AI chatbot for your website
      </div>

    </div>
  );
}