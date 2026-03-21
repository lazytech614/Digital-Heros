"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function WinnerActions({ id, onRefresh }: { id: string, onRefresh: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: "approve" | "reject") => {
    setLoading(action);

    await fetch(`/api/winner/${id}`, {
      method: "POST",
      body: JSON.stringify({ action }),
    });

    setLoading(null);

    onRefresh()
    toast.success("Winner updated!");
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleAction("approve")}
        disabled={loading === "approve"}
      >
        {loading === "approve" ? "Approving..." : "Approve"}
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleAction("reject")}
        disabled={loading === "reject"}
      >
        {loading === "reject" ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
}