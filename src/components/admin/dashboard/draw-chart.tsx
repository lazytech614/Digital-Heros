"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DrawChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Winners per Draw",
        data: data.map((d) => d.winners),
      },
    ],
  };

  return <Bar data={chartData} />;
}