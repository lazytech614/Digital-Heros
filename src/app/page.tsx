import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Prizes from "@/components/landing/prizes";
import Charity from "@/components/landing/charity";
import Pricing from "@/components/landing/pricing";
import { getOrCreateUser } from "@/lib/getUser";

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    const user = await getOrCreateUser()
    // redirect("/dashboard");
    if(user.subscriptionStatus === "ACTIVE") redirect("/dashboard")
  }

  return (
    <main className="flex flex-col">
      <Hero />
      <HowItWorks />
      <Prizes />
      <Charity />
      <Pricing />
    </main>
  );
}