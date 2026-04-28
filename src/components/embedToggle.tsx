"use client";

import { useState } from "react";
import EmbedSection from "./embedSection";
type Props = {
  botId: string;
  botName: string;
};


export default function EmbedToggle({ botId, botName }: Props) {
  const [show, setShow] = useState(false);
  


  return (
    <div className="space-y-4">

      <button
        onClick={() => setShow(!show)}
        className="px-5 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition"
      >
        {show ? "Hide Embed Code" : "Get Embed Code"}
      </button>

      {show && <EmbedSection botId={botId} botName={botName} />}

    </div>
  );
}