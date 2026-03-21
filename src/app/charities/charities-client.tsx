"use client";

import ConfirmationDialog from "@/components/global/confirmation-dialog";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  charities: any[];
  supportedCharityIds: string[];
};

export default function CharitiesClient({ charities, supportedCharityIds }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [supportedIds, setSupportedIds] = useState<string[]>(supportedCharityIds);

  const handleSupportToggle = async (charityId: string) => {
    const isSupported = supportedIds.includes(charityId);
    const action = isSupported ? "remove" : "add";

    try {
      setLoadingId(charityId);

      const res = await fetch("/api/charity/support", {
        method: "POST",
        body: JSON.stringify({ charityId, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success(
          action === "add"
            ? "Charity supported successfully!"
            : "Charity support withdrawn!"
        );

        // Update local state instead of reloading
        setSupportedIds((prev) =>
          action === "add"
            ? [...prev, charityId]
            : prev.filter((id) => id !== charityId)
        );
      }
    } catch (err) {
      console.error("Error updating charity support:", err);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 mt-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Charities</h1>
        <p className="text-gray-500 mt-2">
          Support meaningful causes by contributing to verified charities.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((charity) => {
          const isSupported = supportedIds.includes(charity.id);
          const loading = loadingId === charity.id;

          return (
            <div
              key={charity.id}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              {charity.imageUrl ? (
                <img
                  src={charity.imageUrl}
                  alt={charity.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-lg">{charity.name}</h2>

                  {charity.isFeatured && (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {charity.description}
                </p>

                {/* Button */}
                <ConfirmationDialog
                  title={
                    isSupported
                      ? "Withdraw Charity Support"
                      : "Support Charity"
                  }
                  description={
                    isSupported
                      ? "Are you sure you want to withdraw support for this charity?"
                      : "Are you sure you want to support this charity?"
                  }
                  color={isSupported ? "red" : "green"}
                  onConfirm={() => handleSupportToggle(charity.id)}
                >
                  <button
                    disabled={loading}
                    className={`mt-4 w-full py-2 rounded cursor-pointer ${
                      isSupported
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-[#053C29] text-white hover:bg-[#045022]"
                    }`}
                  >
                    {loading
                      ? "Loading..."
                      : isSupported
                      ? "Withdraw Support"
                      : "Support this charity"}
                  </button>
                </ConfirmationDialog>
              </div>
            </div>
          );
        })}

        {charities.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No charities available yet.
          </div>
        )}
      </div>
    </div>
  );
}