"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmationDialog from "../global/confirmation-dialog";

interface WinnerActionsProps {
  id: string;
  onRefresh: () => void;
  disabled?: boolean; // new prop
}

export default function WinnerActions({ id, onRefresh, disabled = false }: WinnerActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: "approve" | "reject") => {
    setLoading(action);

    await fetch(`/api/winner/${id}`, {
      method: "POST",
      body: JSON.stringify({ action }),
    });

    setLoading(null);
    onRefresh();
    toast.success("Winner updated!");
  };

  return (
    <div className="flex gap-2">
      <ConfirmationDialog
        title="Approve payment"
        description="Are you sure you want to approve this payment? This cannot be undone!"
        onConfirm={() => handleAction("approve")}
        color="green"
      >
        <Button size="sm" disabled={loading === "approve" || disabled}>
          {loading === "approve" ? "Approving..." : "Approve"}
        </Button>
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Reject payment"
        description="Are you sure you want to reject this payment? This cannot be undone!"
        onConfirm={() => handleAction("reject")}
      >
        <Button size="sm" variant="destructive" disabled={loading === "reject" || disabled}>
          {loading === "reject" ? "Rejecting..." : "Reject"}
        </Button>
      </ConfirmationDialog>
    </div>
  );
}