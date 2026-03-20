"use client";

import { useState } from "react";

interface Props {
  onAdd: (par: number, strokes: number) => void;
}

export default function ScoreInput({ onAdd }: Props) {
  const [par, setPar] = useState(4);
  const [strokes, setStrokes] = useState("");

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-3">🏌️ Add Hole Score</h2>

      <label className="block text-sm mb-1">Par</label>
      <select
        value={par}
        onChange={(e) => setPar(Number(e.target.value))}
        className="w-full p-2 border rounded mb-3"
      >
        <option value={3}>Par 3</option>
        <option value={4}>Par 4</option>
        <option value={5}>Par 5</option>
      </select>

      <label className="block text-sm mb-1">Strokes</label>
      <input
        type="number"
        value={strokes}
        onChange={(e) => setStrokes(e.target.value)}
        placeholder="Enter strokes"
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={() => {
          if (!strokes) return;
          onAdd(par, Number(strokes));
          setStrokes("");
        }}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Score
      </button>
    </div>
  );
}