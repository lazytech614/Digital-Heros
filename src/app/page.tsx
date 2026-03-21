import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Prizes from "@/components/landing/prizes";
import Charity from "@/components/landing/charity";
import Pricing from "@/components/landing/pricing";
import { getOrCreateUser } from "@/lib/getUser";
import { isAdmin } from "@/lib/isAdmin";

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    const user = await getOrCreateUser()
    const admin = await isAdmin();
    // redirect("/dashboard");
    if(admin) redirect("/admin")
    if(user.subscriptionStatus === "ACTIVE") redirect("/add-score")
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