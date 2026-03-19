"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScoreCard() {
  const [value, setValue] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch scores
  const fetchScores = async () => {
    const res = await fetch(`/api/scores`);
    const data = await res.json();
    setScores(data);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const submit = async () => {
    const num = Number(value);

    if (!num || num < 1 || num > 45) {
      alert("Enter a number between 1 and 45");
      return;
    }

    setLoading(true);

    await fetch("/api/scores", {
      method: "POST",
      body: JSON.stringify({
        value: num,
        playedAt: new Date(),
      }),
    });

    setValue("");
    await fetchScores();
    setLoading(false);
  };

  return (
    <Card className="bg-card border border-border max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-lg">🎯 Add Your Score</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Input + Button */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="1 - 45"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={submit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>

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
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                {s.value}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}