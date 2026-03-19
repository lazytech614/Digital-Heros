import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ScoreCard from "@/components/score/score-card";
import WinnerCard from "@/components/winner/winner-card";

export default async function Dashboard() {
  const { userId } = await auth();

  const user = await currentUser();
    console.log("🟢🟢", user)

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <ScoreCard />
      <WinnerCard />
    </main>
  );
}