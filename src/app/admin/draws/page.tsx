"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export default function DrawPage() {
  const [loading, setLoading] = useState(false);
  const [draws, setDraws] = useState<any[]>([]);
  const [winners, setWinners] = useState<any[]>([]);
  const [drawSortOrder, setDrawSortOrder] = useState<"newest" | "oldest">("newest");

  // Winner filters
  const [winnerStatusFilter, setWinnerStatusFilter] = useState<"ALL" | "APPROVED" | "PENDING" | "REJECTED">("ALL");
  const [winnerSearch, setWinnerSearch] = useState("");

  const fetchData = async () => {
    try {
      const [drawRes, winnerRes] = await Promise.all([
        fetch("/api/draw"),
        fetch("/api/winner"),
      ]);

      const drawData = await drawRes.json();
      const winnerData = await winnerRes.json();

      setDraws(Array.isArray(drawData) ? drawData : []);
      setWinners(Array.isArray(winnerData) ? winnerData : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runDraw = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/draw/run", { method: "POST" });
      const data = await res.json();

      await fetch("/api/winner/generate", {
        method: "POST",
        body: JSON.stringify({ drawId: data.id }),
      });

      await fetchData();
      toast.success("Draw completed!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // Memoized sorted draws
  const sortedDraws = useMemo(() => {
    const sorted = [...draws].sort((a, b) => {
      return drawSortOrder === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return sorted;
  }, [draws, drawSortOrder]);

  // Memoized filtered winners
  const filteredWinners = useMemo(() => {
    return winners.filter((w) => {
      const matchesStatus = winnerStatusFilter === "ALL" || w.status === winnerStatusFilter;
      const matchesName = w.user?.name?.toLowerCase().includes(winnerSearch.toLowerCase());
      return matchesStatus && matchesName;
    });
  }, [winners, winnerStatusFilter, winnerSearch]);

  return (
    <div className="min-h-screen container mx-auto mt-16 p-6 space-y-10">
      {/* RUN DRAW */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Run Monthly Draw</h1>
        <Button className="cursor-pointer"  onClick={runDraw} disabled={loading}>
          {loading ? "Running..." : "Run Draw"}
        </Button>
      </div>

      {/* DRAWS TABLE */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Draw History</h2>

        <div className="flex items-center gap-4 mb-2">
          <span>Sort:</span>
          <select
            className="p-2 border rounded"
            value={drawSortOrder}
            onChange={(e) => setDrawSortOrder(e.target.value as "newest" | "oldest")}
          >
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>
        </div>

        <div className="bg-white border rounded-xl shadow-sm max-h-100 overflow-y-scroll p-4 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Draw ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Winners</TableHead>
                <TableHead>Total Money Spent</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedDraws.map((d) => {
                const drawWinners = winners.filter((w) => w.drawId === d.id);
                const totalMoney = drawWinners.reduce((sum, w) => sum + w.prizeAmount, 0);

                return (
                  <TableRow key={d.id}>
                    <TableCell>{d.id}</TableCell>
                    <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{drawWinners.length}</TableCell>
                    <TableCell>₹{totalMoney}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* WINNERS TABLE */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Winners</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
          <input
            type="text"
            placeholder="Search by name"
            value={winnerSearch}
            onChange={(e) => setWinnerSearch(e.target.value)}
            className="p-2 border rounded"
          />

          <select
            className="p-2 border rounded"
            value={winnerStatusFilter}
            onChange={(e) => setWinnerStatusFilter(e.target.value as any)}
          >
            <option value="ALL">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="bg-white border rounded-xl shadow-sm max-h-100 overflow-y-scroll p-4 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredWinners.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>{w.user?.name || "N/A"}</TableCell>
                  <TableCell>{w.user?.email}</TableCell>
                  <TableCell>₹{w.prizeAmount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        w.status === "APPROVED"
                          ? "bg-green-100 text-green-600"
                          : w.status === "REJECTED"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {w.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {filteredWinners.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No winners found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}