"use client";

import { useState, useMemo } from "react";
import ProofUpload from "@/components/winner/upload-proof";

type Draw = {
  id: string;
  month: number;
  year: number;
  numbers: number[];
  isPublished: boolean;
  winners: { userId: string }[];
};

type Props = {
  draws: Draw[];
  currentUserId: string | null;
};

export default function DrawsClient({ draws, currentUserId }: Props) {
  const [filterMyWins, setFilterMyWins] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [filterMonth, setFilterMonth] = useState<number | "all">("all");

  const filteredDraws = useMemo(() => {
    let data = [...draws];

    if (filterMonth !== "all") {
      data = data.filter((d) => d.month === filterMonth);
    }

    if (filterMyWins && currentUserId) {
      data = data.filter((d) =>
        d.winners.some((w) => w.userId === currentUserId)
      );
    }

    data.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.year, b.month - 1).getTime() -
          new Date(a.year, a.month - 1).getTime()
        : new Date(a.year, a.month - 1).getTime() -
          new Date(b.year, b.month - 1).getTime()
    );

    return data;
  }, [draws, filterMyWins, sortOrder, filterMonth, currentUserId]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 mt-16">
      <h1 className="text-3xl font-bold mb-6">Monthly Draws</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterMyWins}
            onChange={(e) => setFilterMyWins(e.target.checked)}
            className="w-4 h-4"
          />
          Show only my wins
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="p-2 border rounded"
        >
          <option value="newest">Newest → Oldest</option>
          <option value="oldest">Oldest → Newest</option>
        </select>

        <select
          value={filterMonth}
          onChange={(e) =>
            setFilterMonth(e.target.value === "all" ? "all" : parseInt(e.target.value))
          }
          className="p-2 border rounded"
        >
          <option value="all">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {getMonthName(i + 1)}
            </option>
          ))}
        </select>
      </div>

      {/* Draws */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDraws.length === 0 && (
          <div className="col-span-full text-gray-500 text-center">No draws found</div>
        )}

        {filteredDraws.map((draw) => {
          const totalWinners = draw.winners?.length || 0;
          const isUserWinner = currentUserId
            ? draw.winners.some((w) => w.userId === currentUserId)
            : false;

          return (
            <div
              key={draw.id}
              className={`bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition ${
                isUserWinner ? "border-green-500" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                  {getMonthName(draw.month)} {draw.year}
                </h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    draw.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {draw.isPublished ? "Published" : "Pending"}
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                {draw.numbers.map((num, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#053C29] text-white font-bold"
                  >
                    {num}
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-500 mb-2">Total Winners: {totalWinners}</div>

              {isUserWinner && (
                <div className="mt-2">
                  <span className="text-green-600 font-medium">🎉 You are a winner!</span>
                  {/* <ProofUpload drawId={draw.id} /> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getMonthName(month: number) {
  return new Date(0, month - 1).toLocaleString("default", { month: "long" });
}