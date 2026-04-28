"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteBotButton({ botId }: { botId: string }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/bots/${botId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete ❌");
        return;
      }

      // ✅ Redirect after delete
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* 🔴 DELETE BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-sm bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition"
      >
        Delete Bot
      </button>

      {/* 💎 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-[400px]">
            
            <h2 className="text-lg font-semibold mb-2 text-white">
              Delete Bot
            </h2>

            <p className="text-sm text-zinc-400 mb-6">
              Are you sure? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}