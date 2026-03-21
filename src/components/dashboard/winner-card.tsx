"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Winner = {
  id: string;
  matchType: "THREE" | "FOUR" | "FIVE";
  prizeAmount: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
};

export default function WinnerCard() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWinners = async () => {
    try {
      const res = await fetch("/api/winner/me");
      const data = await res.json();
      setWinners(data);
    } catch (err) {
      console.error("Error fetching winners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  // Calculate total prize amount per status
  const pieData = useMemo(() => {
    const approved = winners
      .filter((w) => w.status === "APPROVED")
      .reduce((sum, w) => sum + w.prizeAmount, 0);

    const pending = winners
      .filter((w) => w.status === "PENDING")
      .reduce((sum, w) => sum + w.prizeAmount, 0);

    const rejected = winners
      .filter((w) => w.status === "REJECTED")
      .reduce((sum, w) => sum + w.prizeAmount, 0);

    return {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [
        {
          label: "Prize Amount",
          data: [approved, pending, rejected],
          backgroundColor: ["#4ade80", "#facc15", "#f87171"], // green, yellow, red
          borderColor: ["#22c55e", "#eab308", "#ef4444"],
          borderWidth: 1,
        },
      ],
    };
  }, [winners]);

  const getBadgeColor = (type: string) => {
    if (type === "FIVE") return "bg-yellow-500 text-black";
    if (type === "FOUR") return "bg-green-500 text-white";
    return "bg-purple-500 text-white";
  };

  const getBgColor = (status: string) => {
    if (status === "APPROVED") return "bg-green-400 text-black";
    if (status === "PENDING") return "bg-yellow-400 text-black";
    if (status === "REJECTED") return "bg-red-400 text-black";
    return "bg-gray-400 text-black";
  };

  return (
    <Card className="mx-auto mt-6 border border-border bg-card">
      <CardHeader>
        <CardTitle>🏆 Your Winnings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 flex flex-col md:flex-row md:h-80">
        {/* Loading / Empty */}
        {loading && <p>Loading...</p>}
        {!loading && winners.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No winnings yet. Try your luck! 🎯
          </p>
        )}

        {/* Pie chart */}
        <div className="w-full md:w-1/3">
          {!loading && winners.length > 0 && (
          <div className="flex justify-center items-center max-w-sm mx-auto">
            <Pie data={pieData} />
          </div>
        )}
        </div>


        {/* Winner cards */}
        <div className="w-full md:w-2/3 flex flex-col items-center gap-y-1 md:h-full relative overflow-y-scroll overflow-x-hidden md:p-10 no-scrollbar">
          {winners.map((w) => (
          <div
            key={w.id}
            className={`flex items-center justify-between p-3 rounded-lg hover:scale-[1.02] transition ${getBgColor(
              w.status
            )} w-full`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(
                  w.matchType
                )}`}
              >
                {w.matchType}
              </span>
              <span className="text-sm text-muted-foreground">Matches</span>
            </div>

            <div className="font-semibold text-lg">₹{w.prizeAmount}</div>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  );
}