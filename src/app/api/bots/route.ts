import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import connectDb from "@/lib/db"
import Chatbot from "@/models/chatbotModel"

// 🔥 GET → Fetch all bots for logged-in user
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const bots = await Chatbot.find({
      userId: token.id,
    }).sort({ createdAt: -1 })

    return NextResponse.json(bots)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch bots" },
      { status: 500 }
    )
  }
}

// 🔥 POST → Create new bot
export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const bot = await Chatbot.create({
      userId: token.id,
      name: body.name,
      supportEmail: body.supportEmail || "",
      knowledge: body.knowledge || "",
    })

    return NextResponse.json(bot, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to create bot" },
      { status: 500 }
    )
  }
}