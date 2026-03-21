"use client";

import { usAdminData } from "@/hooks/useAdminData";
import StatCard from "@/components/admin/dashboard/stats-card";
import DrawChart from "@/components/admin/dashboard/draw-chart";

export default function AdminDashboard() {
  const { data, loading } = usAdminData();

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Error loading data</p>;

  return (
    <div className="container mx-auto p-6 space-y-6 min-h-screen mt-16">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={data.totalUsers} />
        <StatCard title="Total Prize Pool" value={`₹${data.totalPrizePool}`} />
        <StatCard title="Charity Contributions" value={`₹${data.totalCharity}`} />
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Draw Statistics</h2>
        <DrawChart data={data.drawStats} />
      </div>
    </div>
  );
}