"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DrawPage() {
  const [loading, setLoading] = useState(false);

  const runDraw = async () => {
    setLoading(true);

    const res = await fetch("/api/draw/run", {
      method: "POST",
    });

    const data = await res.json();

    await fetch("/api/winner/generate", {
      method: "POST",
      body: JSON.stringify({ drawId: data.id }),
    });

    setLoading(false);

    alert("Draw completed!");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Run Monthly Draw</h1>

      <Button onClick={runDraw} disabled={loading}>
        {loading ? "Running..." : "Run Draw"}
      </Button>
    </div>
  );
}