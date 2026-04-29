"use client"
import { useEffect } from "react"

export default function PlugAIBot() {
  useEffect(() => {
    const existing = document.getElementById("plugai-script")
    if (existing) existing.remove()

    const script = document.createElement("script")
    script.id = "plugai-script"
    script.src = "/chatbot.js"
    script.setAttribute("data-bot-id", "69f1ad90aeef16d53e94bc4a")
    script.setAttribute("data-bot-name", "PlugAI Assistant")
    script.setAttribute("data-bot-logo", "/icon.svg")
    script.async = true
    document.body.appendChild(script)


    return () => {
      document.getElementById("plugai-script")?.remove()
    }
  }, [])

  return null
}