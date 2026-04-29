import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Chatbot from "@/models/chatbotModel";
import mongoose from "mongoose";

/**
 * ✏️ UPDATE BOT
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ botId: string }> }
) {
  try {
    await connectDb();

    // ✅ Get botId (NEW Next.js way)
    const { botId } = await context.params;

    // ✅ Validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(botId)) {
      return NextResponse.json(
        { error: "Invalid Bot ID" },
        { status: 400 }
      );
    }

    // 📦 Parse request body
    const body = await req.json();
    const { name, supportEmail, knowledge } = body;

    // ❗ Validation
    if (!name || !knowledge) {
      return NextResponse.json(
        { error: "Name and Knowledge are required" },
        { status: 400 }
      );
    }

    // 🔄 Update bot
    const updatedBot = await Chatbot.findByIdAndUpdate(
      botId,
      {
        name,
        supportEmail,
        knowledge,
      },
      { new: true }
    );

    // ❌ Bot not found
    if (!updatedBot) {
      return NextResponse.json(
        { error: "Bot not found" },
        { status: 404 }
      );
    }

    // ✅ Success
    return NextResponse.json({
      message: "Bot updated successfully",
      bot: updatedBot,
    });

  } catch (error) {
    console.error("PUT BOT ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * 🗑️ DELETE BOT
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ botId: string }> }
) {
  try {
    await connectDb();

    // ✅ Get botId (NEW Next.js way)
    const { botId } = await context.params;

    // ✅ Validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(botId)) {
      return NextResponse.json(
        { error: "Invalid Bot ID" },
        { status: 400 }
      );
    }

    // 🗑️ Delete bot
    const deletedBot = await Chatbot.findByIdAndDelete(botId);

    // ❌ Not found
    if (!deletedBot) {
      return NextResponse.json(
        { error: "Bot not found" },
        { status: 404 }
      );
    }

    // ✅ Success
    return NextResponse.json({
      message: "Bot deleted successfully",
    });

  } catch (error) {
    console.error("DELETE BOT ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}