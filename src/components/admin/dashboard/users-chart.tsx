"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function UsersChart({ data }: any) {
  const chartData = {
    labels: data.map((d: any) =>
      new Date(d.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Users Growth",
        data: data.map((d: any) => d._count),
      },
    ],
  };

  return <Line data={chartData} />;
}