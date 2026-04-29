import { NextResponse } from "next/server"
import crypto from "crypto"
import mongoose from "mongoose"
import connectDb from "@/lib/db"
import User from "@/models/userModel"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("x-razorpay-signature")!

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex")

  if (signature !== expected) {
    console.log("❌ Invalid signature")
    return new NextResponse("Invalid signature", { status: 400 })
  }



  const event = JSON.parse(body)

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity

    const userId = payment.notes?.userId
    const plan = payment.notes?.plan

    

    if (!userId || !plan) {
      console.log("❌ Missing data", { userId, plan })
      return NextResponse.json({ ok: false })
    }

    const normalizedPlan = plan.toLowerCase()

    const updatedPlan =
      normalizedPlan === "business" ? "business" : "pro"

    const credits =
      updatedPlan === "business" ? 999999 : 5000

    await connectDb()

    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        $set: {
          plan: updatedPlan,
          credits,
        },
      }
    )

 
  }

  return NextResponse.json({ ok: true })
}