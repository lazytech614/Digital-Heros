"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ProfileEditForm({ user }: any) {
  const [name, setName] = useState(user.name || "");
  const [contributionPct, setContributionPct] = useState(
    user.contributionPct
  );
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try{
      setLoading(true);
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        body: JSON.stringify({ name, contributionPct }),
      });

      // const data = await res.json();

      if (!res.ok) toast.error("Something went wrong!");
      else toast.success("Updated successfully!");
    }catch(err) {
      console.error(err);
      toast.error("Something went wrong!");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Edit Profile</h3>

      <input
        className="border p-2 rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        type="number"
        className="border p-2 rounded w-full"
        value={contributionPct}
        onChange={(e) =>
          setContributionPct(Number(e.target.value))
        }
      />

      <button
        disabled={loading}
        onClick={handleUpdate}
        className="bg-[#053C29] text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}