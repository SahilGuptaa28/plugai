import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import PlugAIBot from "@/components/plugAI";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlugAI — AI Customer Support SaaS",
  description:
    "PlugAI is a multi-tenant AI SaaS that enables businesses to embed smart, customizable customer support chatbots into any website.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

 {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <Providers>

            <main>{children}</main>
            <PlugAIBot />
             <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={10}
  containerStyle={{ top: 20 }}
  toastOptions={{
    duration: 4000,
    style: {
      background: "rgba(15,15,15,0.9)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "14px 16px",
      fontSize: "14px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    },

    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#0f0f0f",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#0f0f0f",
      },
    },
  }}
/>
          
        </Providers>

         </body>
    </html>
  );
}
