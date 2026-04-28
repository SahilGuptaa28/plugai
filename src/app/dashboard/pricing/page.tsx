"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Check, X } from "lucide-react"

export default function PricingPage() {
  const { data: session } = useSession()

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect for trying out PlugAI.",
      badge: null,
      cta: "Current Plan",
      ctaHref: "/dashboard",
      current: true,
      features: [
        { text: "1 chatbot", included: true },
        { text: "100 messages / month", included: true },
        { text: "Basic knowledge base", included: true },
        { text: "Embed on 1 website", included: true },
        { text: "PlugAI branding", included: true },
        { text: "Multiple bots", included: false },
        { text: "Custom branding", included: false },
        { text: "Analytics", included: false },
        { text: "Priority support", included: false },
      ],
    },
    {
      name: "Pro",
      price: "$9",
      period: "month",
      desc: "For growing businesses and teams.",
      badge: "Most Popular",
      cta: session ? "Upgrade to Pro" : "Get Started",
      ctaHref: session ? "/dashboard/pricing" : "/register",
      current: false,
      features: [
        { text: "5 chatbots", included: true },
        { text: "5,000 messages / month", included: true },
        { text: "Advanced knowledge base", included: true },
        { text: "Embed on any website", included: true },
        { text: "Remove PlugAI branding", included: true },
        { text: "Multiple bots", included: true },
        { text: "Custom branding", included: true },
        { text: "Analytics dashboard", included: true },
        { text: "Priority support", included: false },
      ],
    },
    {
      name: "Business",
      price: "$29",
      period: "month",
      desc: "For teams that need full power and scale.",
      badge: "Best Value",
      cta: session ? "Upgrade to Business" : "Get Started",
      ctaHref: session ? "/dashboard/pricing" : "/register",
      current: false,
      features: [
        { text: "Unlimited chatbots", included: true },
        { text: "Unlimited messages", included: true },
        { text: "Advanced knowledge base", included: true },
        { text: "Embed on any website", included: true },
        { text: "Remove PlugAI branding", included: true },
        { text: "Multiple bots", included: true },
        { text: "Custom branding", included: true },
        { text: "Analytics dashboard", included: true },
        { text: "Priority support", included: true },
      ],
    },
  ]

  return (
    <div className="text-white max-w-6xl mx-auto py-8 space-y-12">

      {/* HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Simple pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold">Choose your plan</h1>
        <p className="text-white/50 max-w-md mx-auto leading-relaxed">
          Start free and scale as you grow. No hidden fees, no surprises.
        </p>
      </div>

      {/* PLANS */}
      <div className="grid sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 flex flex-col gap-6 ${
              plan.name === "Pro"
                ? "border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                : plan.name === "Business"
                ? "border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5"
                : "border-white/10 bg-white/5"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-xs font-semibold rounded-full ${
                plan.name === "Pro" ? "bg-blue-500" : "bg-purple-500"
              }`}>
                {plan.badge}
              </div>
            )}

            {/* Plan info */}
            <div>
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-white/40 text-sm mb-1">/ {plan.period}</span>
              </div>
              <p className="text-white/50 text-sm mt-2">{plan.desc}</p>
            </div>

            {/* CTA */}
            <Link href={plan.ctaHref}>
              <button className={`w-full py-3 rounded-full font-medium text-sm transition ${
                plan.name === "Pro"
                  ? "bg-white text-black hover:bg-zinc-200"
                  : plan.name === "Business"
                  ? "bg-purple-500/20 border border-purple-400/30 text-purple-300 hover:bg-purple-500/30"
                  : "border border-white/20 hover:bg-white/10"
              } ${plan.current ? "opacity-50 cursor-default pointer-events-none" : ""}`}>
                {plan.cta}
              </button>
            </Link>

            {/* Features */}
            <div className="space-y-2.5">
              <p className="text-xs text-white/30 uppercase tracking-wider">What's included</p>
              {plan.features.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  {f.included ? (
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      plan.name === "Business" ? "bg-purple-400/20" : "bg-blue-400/20"
                    }`}>
                      <Check size={10} className={plan.name === "Business" ? "text-purple-400" : "text-blue-400"} />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <X size={10} className="text-white/20" />
                    </div>
                  )}
                  <span className={`text-sm ${f.included ? "text-white/80" : "text-white/25 line-through"}`}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* COMPARISON TABLE */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Full Comparison</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/50 font-medium">Feature</th>
                <th className="text-center px-6 py-4 text-white/50 font-medium">Free</th>
                <th className="text-center px-6 py-4 text-blue-400 font-medium">Pro</th>
                <th className="text-center px-6 py-4 text-purple-400 font-medium">Business</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Chatbots", free: "1", pro: "5", business: "Unlimited" },
                { feature: "Messages / month", free: "100", pro: "5,000", business: "Unlimited" },
                { feature: "Knowledge base", free: "Basic", pro: "Advanced", business: "Advanced" },
                { feature: "Websites", free: "1", pro: "Unlimited", business: "Unlimited" },
                { feature: "Custom branding", free: false, pro: true, business: true },
                { feature: "Analytics", free: false, pro: true, business: true },
                { feature: "Priority support", free: false, pro: false, business: true },
                { feature: "Early access", free: false, pro: true, business: true },
              ].map((row, i) => (
                <tr key={row.feature} className={`border-b border-white/5 last:border-0 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                  <td className="px-6 py-3.5 text-white/70">{row.feature}</td>
                  {(["free", "pro", "business"] as const).map((plan) => (
                    <td key={plan} className="px-6 py-3.5 text-center">
                      {typeof row[plan] === "boolean" ? (
                        row[plan]
                          ? <Check size={14} className={`mx-auto ${plan === "business" ? "text-purple-400" : "text-blue-400"}`} />
                          : <X size={14} className="text-white/20 mx-auto" />
                      ) : (
                        <span className={`font-medium ${
                          plan === "business" ? "text-purple-400" :
                          plan === "pro" ? "text-blue-400" : "text-white/60"
                        }`}>{row[plan]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Common Questions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { q: "Can I upgrade or downgrade anytime?", a: "Yes, you can change your plan at any time. Upgrades take effect immediately." },
            { q: "What happens when I hit the message limit?", a: "Your chatbot will stop responding until the next billing cycle. Upgrade anytime to restore access." },
            { q: "Do I need a credit card for the free plan?", a: "No. The Free plan is completely free with no credit card required." },
            { q: "What's the difference between Pro and Business?", a: "Business unlocks unlimited bots, unlimited messages, and priority support — perfect for scaling teams." },
          ].map((item) => (
            <div key={item.q} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-1.5 hover:border-blue-400/30 transition">
              <p className="font-medium text-white text-sm">{item.q}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="pt-4 border-t border-white/10 text-xs text-white/30 flex items-center justify-between">
        <span>Plug<span className="text-blue-400">AI</span> — AI chatbot for your website</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

    </div>
  )
}