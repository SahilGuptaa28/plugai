import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer"
import HomePage from "@/components/HomePage";
import HowItWorks from "@/components/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HomePage/>
    <Features/>
    <HowItWorks/>
    <CTA/>
    <Footer/>
    </>
  );
}
