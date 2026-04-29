import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Chatbot from "@/models/chatbotModel";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    await connectDb();

    const { botId } = await params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(botId)) {
      return NextResponse.json(
        { error: "Invalid Bot ID" },
        { status: 400 }
      );
    }

    // 📦 Get request body
    const { name, supportEmail, knowledge } = await req.json();

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
      { new: true } // return updated data
    );

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
  

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    await connectDb();

    const { botId } = await params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(botId)) {
      return NextResponse.json(
        { error: "Invalid Bot ID" },
        { status: 400 }
      );
    }

    // 🗑️ Delete bot
    const deletedBot = await Chatbot.findByIdAndDelete(botId);

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