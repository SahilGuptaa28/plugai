import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";
import Chatbot from "@/models/chatbotModel";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { message, botId } = await req.json();

    if (!message || !botId) {
      return NextResponse.json(
        { error: "message and botId are required" },
        { status: 400 }
      );
    }

    const bot = await Chatbot.findById(botId);

    if (!bot) {
      return NextResponse.json(
        { error: "Bot not found" },
        { status: 404 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const prompt = `
You are a professional customer support assistant for this business.

Business Name: ${bot.name}
Support Email: ${bot.supportEmail}

Use ONLY the information provided below to answer the customer's question.
Do NOT invent new policies.

If unrelated, reply EXACTLY:
"Please contact support at ${bot.supportEmail}"

-----------------------
BUSINESS INFORMATION
-----------------------
${bot.knowledge}

-----------------------
CUSTOMER QUESTION
-----------------------
${message}
`;

    // ✅ CORRECT Gemini call
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // ✅ CORRECT way to extract text
    const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    const response = NextResponse.json({
      reply: reply || `Please contact support at ${bot.supportEmail}`,
    });

    // ✅ FIX CORS (VERY IMPORTANT)
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;

  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ REQUIRED for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}