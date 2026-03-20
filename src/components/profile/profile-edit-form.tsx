"use client";

import { useState } from "react";

export default function ProfileEditForm({ user }: any) {
  const [name, setName] = useState(user.name || "");
  const [contributionPct, setContributionPct] = useState(
    user.contributionPct
  );

  const handleUpdate = async () => {
    const res = await fetch("/api/users/update", {
      method: "PATCH",
      body: JSON.stringify({ name, contributionPct }),
    });

    const data = await res.json();

    if (!res.ok) alert(data.error);
    else alert("Updated successfully!");
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
        onClick={handleUpdate}
        className="bg-[#053C29] text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}