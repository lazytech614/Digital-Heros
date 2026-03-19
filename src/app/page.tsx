import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ScoreCard from "@/components/score/score-card";
import WinnerCard from "@/components/winner/winner-card";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <ScoreCard />
      <WinnerCard />
    </main>
  );
}