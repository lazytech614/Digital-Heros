"use client";

import { useState } from "react";
import { toast } from "sonner";
import ConfirmationDialog from "../global/confirmation-dialog";

type Charity = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  charities: Charity[];
};

export default function ProfileCharities({ charities }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [supportedCharities, setSupportedCharities] = useState<Charity[]>(charities);

  const handleWithdrawSupport = async (charityId: string) => {
    try {
      setLoadingId(charityId);

      const res = await fetch("/api/charity/support", {
        method: "POST",
        body: JSON.stringify({ charityId, action: "remove" }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success("Charity support withdrawn successfully!");
        setSupportedCharities((prev) =>
          prev.filter((c) => c.id !== charityId)
        );
      }
    } catch (err) {
      console.error("Error withdrawing support:", err);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Your Charities</h2>

      {supportedCharities.length === 0 ? (
        <p className="text-gray-500">No charities selected</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {supportedCharities.map((c) => {
            const loading = loadingId === c.id;
            return (
              <div key={c.id} className="border p-4 rounded-lg flex flex-col justify-between">
                <h3 className="font-medium">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.description}</p>
                <ConfirmationDialog
                  title="Withdraw Charity Support"
                  description="Are you sure you want to withdraw support for this charity?"
                  onConfirm={() => handleWithdrawSupport(c.id)}
                >
                  <button
                    disabled={loading}
                    className={`mt-4 w-full py-2 rounded cursor-pointer bg-red-600 text-white hover:bg-red-700 ${
                      loading ? "opacity-70 cursor-wait" : ""
                    }`}
                  >
                    {loading ? "Loading..." : "Withdraw Support"}
                  </button>
                </ConfirmationDialog>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}