"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WinnerActions from "@/components/winner/winner-actions";

type Winner = {
  id: string;
  prizeAmount: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  user: {
    name: string;
    email: string;
  };
};

export default function WinnersPageClient() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & sort
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "APPROVED" | "PENDING" | "REJECTED">("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchWinners = async () => {
    try {
      const res = await fetch("/api/winner");
      const data = await res.json();
      setWinners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  // Compute top 3 winners by prizeAmount
  const topWinners = useMemo(() => {
    const grouped: Record<string, { name: string; email: string; totalAmount: number }> = {};
    winners.forEach((w) => {
      if (!grouped[w.user.email]) {
        grouped[w.user.email] = { name: w.user.name, email: w.user.email, totalAmount: 0 };
      }
      grouped[w.user.email].totalAmount += w.prizeAmount;
    });

    return Object.values(grouped)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 3);
  }, [winners]);

  // Filtered & sorted winners for main table
  const filteredWinners = useMemo(() => {
    let filtered = [...winners];

    if (searchName.trim() !== "") {
      filtered = filtered.filter((w) =>
        w.user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((w) => w.status === statusFilter);
    }

    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.prizeAmount - b.prizeAmount : b.prizeAmount - a.prizeAmount
    );

    return filtered;
  }, [winners, searchName, statusFilter, sortOrder]);

  return (
    <div className="container mx-auto min-h-screen mt-16 p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Winners</h1>

      {/* Top Winners */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {topWinners.map((w, i) => (
          <div
  key={w.email}
  className={`p-4 rounded-xl shadow flex flex-col items-center justify-center ${
    i === 0
      ? "bg-yellow-200" // 1st place – gold
      : i === 1
      ? "bg-gray-200" // 2nd place – silver
      : "bg-orange-200" // 3rd place – bronze
  }`}
>
  <span className="text-sm text-gray-500">#{i + 1} Top Winner</span>
  <h2 className="font-semibold text-lg mt-1">{w.name}</h2>
  <span className="text-gray-600">{w.email}</span>
  <span className="mt-2 font-bold text-green-600 text-lg">₹{w.totalAmount}</span>
</div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="ALL">All Status</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select
          className="p-2 border rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Amount: High → Low</option>
          <option value="asc">Amount: Low → High</option>
        </select>
      </div>

      {/* Winners Table */}
      <div className="bg-white rounded-xl border shadow-sm max-h-96 overflow-y-auto p-4 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading && filteredWinners.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No winners found
                </TableCell>
              </TableRow>
            )}

            {filteredWinners.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-medium">{w.user.name || "N/A"}</TableCell>
                <TableCell>{w.user.email}</TableCell>
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
                <TableCell className="text-right space-x-2 flex">
                  <WinnerActions id={w.id} onRefresh={fetchWinners} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}