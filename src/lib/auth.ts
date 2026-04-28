import User from "@/models/userModel"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "./db"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                let email = credentials?.email.toLowerCase()
                let password = credentials?.password
                if (!email || !password) {
                    throw new Error("email or password is not found")
                }
                await connectDb()
                let user = await User.findOne({ email }).select("+password");
                if (!user) {
                    throw new Error("user not found")
                }
                let isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
    if (account?.provider === "google") {
      await connectDb()

      const existingUser = await User.findOne({ email: user.email })

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          password: null, // no password for Google users
        })
      }
      user.id = existingUser._id as string
    }

    return true
  },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image as string
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default authOptions