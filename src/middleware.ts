import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // ❌ If NOT logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
 

  // ✅ If logged in → allow access
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}