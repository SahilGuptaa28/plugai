"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditBotForm({ bot }: any) {
  const [name, setName] = useState(bot.name);
  const [email, setEmail] = useState(bot.supportEmail);
  const [knowledge, setKnowledge] = useState(bot.knowledge);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/bots/${bot._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          supportEmail: email,
          knowledge,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }
        router.refresh();

      alert("Updated successfully ✅");

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">

      <div>
        <label className="text-sm text-zinc-400">Bot Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-3 rounded-lg bg-black/40 border border-white/10"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Support Email</label>
        <input
          value={email}
           placeholder="yourcompany@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-3 rounded-lg bg-black/40 border border-white/10"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Knowledge</label>
       <textarea
  value={knowledge}
  placeholder={`Example:
• Pricing: Starts at $10/month
• Refund Policy: Available within 7 days
• Support: 24/7 via chat and email

Tip: Add FAQs, policies, or product details here...`}
  onChange={(e) => setKnowledge(e.target.value)}
  rows={6}
  className="w-full mt-2 p-3 rounded-lg bg-black/40 border border-white/10 placeholder:text-zinc-500"
/>
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-5 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>

    </div>
  );
}