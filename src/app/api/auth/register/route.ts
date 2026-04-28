import connectDb from "@/lib/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // 🔹 Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await connectDb();

    // 🔹 Normalize email
    const normalizedEmail = email.toLowerCase();

    const existUser = await User.findOne({ email: normalizedEmail });

    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password, // 🔥 model will hash
    });

    // 🔹 Remove sensitive fields
    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json(userObj, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Register error", error: error.message },
      { status: 500 }
    );
  }
}