import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import CharitySection from "@/components/landing/charity-section";
import CTA from "@/components/landing/cta";

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col">
      <Hero />
      <HowItWorks />
      <CharitySection />
      <CTA />
    </main>
  );
}