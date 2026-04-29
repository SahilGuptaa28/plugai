import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    credits?: number
    plan?: "free" | "pro" | "business"
  }

  interface Session {
    user: {
      id: string
      credits?: number
      plan?: "free" | "pro" | "business"
    } & DefaultSession["user"]
  }
}

export {}