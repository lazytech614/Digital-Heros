"use client";

export default function RevenueChart({ revenue }: { revenue: number }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold">Revenue</h2>
      <p className="text-3xl font-bold mt-2">₹{revenue}</p>
    </div>
  );
}