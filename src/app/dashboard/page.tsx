"use client";

import ScoreCard from "@/components/dashboard/score-card";
import WinnerCard from "@/components//dashboard/winner-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-6 mt-20">
        <h1 className="text-2xl font-bold">🏌️ Stableford Tracker</h1>
        <p className="text-sm text-muted-foreground">
          Track your golf performance & win rewards
        </p>
      </div>

      {/* Score Input */}
      <div className="w-full max-w-md">
        <ScoreCard />
      </div>

      {/* Winnings */}
      <div className="w-full max-w-md">
        <WinnerCard />
      </div>

      {/* Footer Hint */}
      <p className="mt-6 text-xs text-muted-foreground text-center">
        Tip: Par = 2 pts • Birdie = 3 pts • Eagle = 4 pts
      </p>
    </main>
  );
}