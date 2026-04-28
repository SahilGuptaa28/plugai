import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";


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
          
        </Providers>

         </body>
    </html>
  );
}
