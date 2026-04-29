// export default function ContactPage() {
//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">

//       {/* Background */}
//       <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
//       <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

//       <div className="relative z-10 max-w-5xl mx-auto px-8 py-20">

//         {/* HEADER */}
//         <div className="text-center mb-16 space-y-4">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium">
//             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//             Get in touch
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
//             Let's build something <span className="text-blue-400">amazing</span>
//           </h1>
//           <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
//             Have a custom chatbot idea, business requirement, or collaboration in mind?
//             We'd love to hear from you.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid md:grid-cols-2 gap-8">

//           {/* LEFT */}
//           <div className="space-y-6">

//             {/* What we offer */}
//             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//               <h2 className="text-lg font-semibold">What we offer</h2>
//               <div className="space-y-3">
//                 {[
//                   { icon: "🤖", title: "Custom AI Chatbots", desc: "Tailored chatbots built around your business needs." },
//                   { icon: "🔌", title: "Website Integration", desc: "Seamless embedding and automation for any platform." },
//                   { icon: "🤝", title: "SaaS Collaborations", desc: "Partnerships and white-label solutions for agencies." },
//                   { icon: "💡", title: "Product Consulting", desc: "Strategic advice for startups and growing teams." },
//                 ].map((item) => (
//                   <div key={item.title} className="flex items-start gap-3">
//                     <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-base shrink-0">
//                       {item.icon}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-white">{item.title}</p>
//                       <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Contact info */}
//             <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 space-y-4">
//               <h2 className="text-lg font-semibold">Contact Info</h2>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-base shrink-0">
//                     📧
//                   </div>
//                   <div>
//                     <p className="text-xs text-white/40">Email us at</p>
//                     <p className="text-sm text-blue-400 font-medium">support@plugai.com</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-xl bg-green-500/20 border border-green-400/20 flex items-center justify-center text-base shrink-0">
//                     ⚡
//                   </div>
//                   <div>
//                     <p className="text-xs text-white/40">Response time</p>
//                     <p className="text-sm text-white font-medium">Within 24 hours</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { value: "24h", label: "Response" },
//                 { value: "500+", label: "Bots built" },
//                 { value: "99%", label: "Satisfaction" },
//               ].map((s) => (
//                 <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
//                   <div className="text-xl font-bold text-blue-400">{s.value}</div>
//                   <div className="text-xs text-white/40 mt-1">{s.label}</div>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* RIGHT — FORM */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-5">
//             <div>
//               <h2 className="text-xl font-semibold">Send a message</h2>
//               <p className="text-white/40 text-sm mt-1">We'll get back to you within 24 hours.</p>
//             </div>

//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs text-white/40 uppercase tracking-wider">Your name</label>
//                 <input
//                   type="text"
//                   placeholder="Sahil Gupta"
//                   className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm placeholder:text-white/20"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs text-white/40 uppercase tracking-wider">Email address</label>
//                 <input
//                   type="email"
//                   placeholder="you@company.com"
//                   className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm placeholder:text-white/20"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs text-white/40 uppercase tracking-wider">Subject</label>
//                 <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm text-white/70">
//                   <option value="">Select a topic...</option>
//                   <option value="custom">Custom chatbot</option>
//                   <option value="integration">Website integration</option>
//                   <option value="partnership">Partnership</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs text-white/40 uppercase tracking-wider">Message</label>
//                 <textarea
//                   placeholder="Tell us about your idea or project..."
//                   rows={5}
//                   className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm placeholder:text-white/20 resize-none"
//                 />
//               </div>

//               <button
//                 type="button"
//                 className="w-full py-3 rounded-full font-medium bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] transition shadow-lg text-sm"
//               >
//                 Send Message →
//               </button>

//               <p className="text-center text-xs text-white/30">
//                 No spam. We only reply to genuine inquiries.
//               </p>
//             </div>
//           </div>

//         </div>

//         {/* FOOTER NOTE */}
//         <div className="mt-16 pt-6 border-t border-white/10 text-xs text-white/30 flex items-center justify-between">
//           <span>Plug<span className="text-blue-400">AI</span> — AI chatbot for your website</span>
//           <span>© {new Date().getFullYear()}</span>
//         </div>

//       </div>
//     </div>
//   )
// }
import Img from "next/image"
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-20">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Get in touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Let's build something <span className="text-blue-400">amazing</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            Have a custom chatbot idea, business requirement, or collaboration in mind?
            We'd love to hear from you.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* What we offer */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">What we offer</h2>
              <div className="space-y-3">
                {[
                  { icon: "🤖", title: "Custom AI Chatbots", desc: "Tailored chatbots built around your business needs." },
                  { icon: "🔌", title: "Website Integration", desc: "Seamless embedding and automation for any platform." },
                  { icon: "🤝", title: "SaaS Collaborations", desc: "Partnerships and white-label solutions for agencies." },
                  { icon: "💡", title: "Product Consulting", desc: "Strategic advice for startups and growing teams." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-base shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Contact Info</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-base shrink-0">
                    📧
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Email us at</p>
                    <p className="text-sm text-blue-400 font-medium">support@plugai.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/20 border border-green-400/20 flex items-center justify-center text-base shrink-0">
                    ⚡
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Response time</p>
                    <p className="text-sm text-white font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "24h", label: "Response" },
                { value: "500+", label: "Bots built" },
                { value: "99%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-blue-400">{s.value}</div>
                  <div className="text-xs text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* DEVELOPER CARD */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-400/30 transition">
  <div className="relative shrink-0">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-400/20 flex items-center justify-center text-xl font-bold text-blue-400">
      <Img src="/profile.jpeg" alt="Sahil Gupta"  width={48}
      height={48} className="w-full h-full object-cover rounded-xl" />
    </div>
    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-black flex items-center justify-center">
      <span className="text-[7px]">✓</span>
    </div>
  </div>
  <div className="min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
      <p className="text-sm font-semibold text-white">Sahil Gupta</p>
      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-medium">
        Founder &amp; Dev
      </span>
    </div>
    <p className="text-xs text-white/40 mt-0.5">Building simple AI tools for real-world use</p>
    <a href="mailto:sahilgupta@gmail.com" className="text-xs text-blue-400/70 hover:text-blue-400 transition mt-0.5 block">
      sahilgupta77236@gmail.com
    </a>
    <div className="flex items-center gap-1.5 mt-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-[11px] text-green-400">Available for projects</span>
    </div>
  </div>
</div>
          </div>

          {/* RIGHT — FORM */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Send a message</h2>
              <p className="text-white/40 text-sm mt-1">We'll get back to you within 24 hours.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/40 uppercase tracking-wider">Your name</label>
                <input
                  type="text"
                  placeholder="Sahil Gupta"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/40 uppercase tracking-wider">Email address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/40 uppercase tracking-wider">Subject</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm text-white/70">
                  <option value="">Select a topic...</option>
                  <option value="custom">Custom chatbot</option>
                  <option value="integration">Website integration</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/40 uppercase tracking-wider">Message</label>
                <textarea
                  placeholder="Tell us about your idea or project..."
                  rows={5}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-400/50 transition text-sm placeholder:text-white/20 resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-full font-medium bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] transition shadow-lg text-sm"
              >
                Send Message →
              </button>

              <p className="text-center text-xs text-white/30">
                No spam. We only reply to genuine inquiries.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}