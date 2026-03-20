"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateStablefordPoints } from "@/services/stableford.points.calculation";

export default function ScoreCard() {
  const [par, setPar] = useState(4);
  const [strokes, setStrokes] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastPoints, setLastPoints] = useState<number | null>(null);

  const fetchScores = async () => {
    const res = await fetch(`/api/scores`);
    const data = await res.json();
    setScores(data);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const submit = async () => {
    const strokeNum = Number(strokes);

    if (!strokeNum || strokeNum < 1) {
      alert("Enter valid strokes");
      return;
    }

    const points = calculateStablefordPoints(par, strokeNum);
    setLastPoints(points);

    setLoading(true);

    await fetch("/api/scores", {
      method: "POST",
      body: JSON.stringify({
        value: points,
        playedAt: new Date(),
      }),
    });

    setStrokes("");
    await fetchScores();
    setLoading(false);
  };

  const getColor = (points: number) => {
    if (points >= 3) return "bg-green-100 text-green-700";
    if (points === 2) return "bg-gray-100 text-gray-700";
    return "bg-red-100 text-red-600";
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          🏌️ Add Stableford Score
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Par Selection */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Select Par</p>
          <div className="flex gap-2">
            {[3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setPar(p)}
                className={`flex-1 py-2 rounded-full border text-sm font-medium transition
                  ${
                    par === p
                      ? "bg-black text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                Par {p}
              </button>
            ))}
          </div>
        </div>

        {/* Strokes Input */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter strokes"
            value={strokes}
            onChange={(e) => setStrokes(e.target.value)}
          />
          <Button onClick={submit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>

        {/* Feedback */}
        {lastPoints !== null && (
          <div
            className={`text-center py-2 rounded-lg text-sm font-medium ${getColor(
              lastPoints
            )}`}
          >
            You scored <b>{lastPoints}</b> points 🎯
          </div>
        )}

        {/* Scores List */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-2">
            Your Last Scores
          </h3>

          <div className="flex flex-wrap gap-2">
            {scores.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No scores yet
              </p>
            )}

            {scores.map((s) => (
              <div
                key={s.id}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getColor(
                  s.value
                )}`}
              >
                {s.value} pts
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}