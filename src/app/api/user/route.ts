import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import {authOptions} from "@/lib/auth"
import connectDb from "@/lib/db"
import User from "@/models/userModel"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDb()

    const user = await User.findById(session.user.id).lean()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      credits: user.credits,
      image: user.image || null,
    })
  } catch (error) {
    console.log("❌ User API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}