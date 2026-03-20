"use client";

import { useEffect, useState } from "react";
import AddCharityForm from "@/components/admin/add-charity-form";
import CharityItem from "@/components/admin/charity-item";

type Charity = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  isFeatured: boolean;
};

export default function CharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCharities = async () => {
    const res = await fetch("/api/charity");
    const data = await res.json();
    setCharities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Charities</h1>

      <AddCharityForm onSuccess={fetchCharities} />

      {loading && <p>Loading...</p>}

      {!loading && charities.length === 0 && (
        <p className="text-muted-foreground">No charities found</p>
      )}

      <div className="space-y-4">
        {charities.map((charity) => (
          <CharityItem
            key={charity.id}
            charity={charity}
            onRefresh={fetchCharities}
          />
        ))}
      </div>
    </div>
  );
}