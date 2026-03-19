"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Winner = {
  id: string;
  matchType: "THREE" | "FOUR" | "FIVE";
  prizeAmount: number;
};

export default function WinnerCard() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWinners = async () => {
    const res = await fetch("/api/winner/me");
    const data = await res.json();
    setWinners(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  const getBadgeColor = (type: string) => {
    if (type === "FIVE") return "bg-yellow-500 text-black";
    if (type === "FOUR") return "bg-green-500 text-white";
    return "bg-purple-500 text-white";
  };

  return (
    <Card className="max-w-md mx-auto mt-6 border border-border bg-card">
      <CardHeader>
        <CardTitle>🏆 Your Winnings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && <p>Loading...</p>}

        {!loading && winners.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No winnings yet. Try your luck! 🎯
          </p>
        )}

        {winners.map((w) => (
          <div
            key={w.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary"
          >
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(
                  w.matchType
                )}`}
              >
                {w.matchType}
              </span>

              <span className="text-sm text-muted-foreground">
                Matches
              </span>
            </div>

            <div className="font-semibold">
              ₹{w.prizeAmount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}