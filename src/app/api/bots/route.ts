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

// // 🔥 POST → Create new bot
// export async function POST(req: NextRequest) {
//   try {
//     await connectDb()

//     const token = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//     })

//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       )
//     }

//     const body = await req.json()

//     if (!body.name) {
//       return NextResponse.json(
//         { error: "Name is required" },
//         { status: 400 }
//       )
//     }

//     const bot = await Chatbot.create({
//       userId: token.id,
//       name: body.name,
//       supportEmail: body.supportEmail || "",
//       knowledge: body.knowledge || "",
//     })

//     return NextResponse.json(bot, { status: 201 })

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json(
//       { error: "Failed to create bot" },
//       { status: 500 }
//     )
//   }
// }


import User from "@/models/userModel"


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

    // 🔥 1. Get user
    const user = await User.findById(token.id)

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // 🔥 2. Count user's bots
    const botCount = await Chatbot.countDocuments({
      userId: token.id,
    })

    // 🔥 3. Define limits
    const limits: any = {
      free: 1,
      pro: 5,
      business: 1000, // or Infinity
    }

    const userLimit = limits[user.plan] || 1

    // ❌ 4. Block if limit reached
    if (botCount >= userLimit) {
      return NextResponse.json(
        { error: "Bot limit reached. Upgrade your plan." },
        { status: 403 }
      )
    }

    // ✅ 5. Create bot
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