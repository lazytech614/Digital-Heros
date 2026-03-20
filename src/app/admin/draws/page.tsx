"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DrawPage() {
  const [loading, setLoading] = useState(false);
  const [draws, setDraws] = useState<any[]>([]);
  const [winners, setWinners] = useState<any[]>([]);

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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runDraw = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/draw/run", {
        method: "POST",
      });

      const data = await res.json();

      await fetch("/api/winner/generate", {
        method: "POST",
        body: JSON.stringify({ drawId: data.id }),
      });

      await fetchData(); // 🔥 refresh data
      alert("Draw completed!");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen mt-16 p-6 space-y-10">
      {/* RUN DRAW */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Run Monthly Draw</h1>

        <Button onClick={runDraw} disabled={loading}>
          {loading ? "Running..." : "Run Draw"}
        </Button>
      </div>

      {/* DRAWS TABLE */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Draw History</h2>

        <div className="bg-white border rounded-xl shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Draw ID</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {draws.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>
                    {new Date(d.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* WINNERS TABLE */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Winners</h2>

        <div className="bg-white border rounded-xl shadow-sm">
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
              {winners.map((w) => (
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}