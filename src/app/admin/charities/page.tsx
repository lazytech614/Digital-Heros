"use client";

import { useEffect, useState, useMemo } from "react";
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

  // Filters
  const [searchName, setSearchName] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState<"ALL" | "FEATURED" | "NON_FEATURED">("ALL");

  const fetchCharities = async () => {
    const res = await fetch("/api/charity");
    const data = await res.json();
    setCharities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  // Filtered charities
  const filteredCharities = useMemo(() => {
    let filtered = [...charities];

    // Filter by name
    if (searchName.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by featured status
    if (featuredFilter === "FEATURED") {
      filtered = filtered.filter((c) => c.isFeatured);
    } else if (featuredFilter === "NON_FEATURED") {
      filtered = filtered.filter((c) => !c.isFeatured);
    }

    return filtered;
  }, [charities, searchName, featuredFilter]);

  return (
    <div className="mx-auto p-6 min-h-screen container mt-16">
      <h1 className="text-2xl font-bold mb-4">Charities</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Charity Form */}
        <div className="lg:w-1/3">
          <AddCharityForm onSuccess={fetchCharities} />

          {/* Filters */}
          <h1 className="text-2xl font-bold mb-4">Filters</h1>
          <div className="mt-6 space-y-2">
            <input
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value as any)}
              className="w-full p-2 border rounded"
            >
              <option value="ALL">All</option>
              <option value="FEATURED">Featured</option>
              <option value="NON_FEATURED">Non-Featured</option>
            </select>
          </div>
        </div>

        {/* Charity List */}
        {loading && <p>Loading...</p>}

        {!loading && filteredCharities.length === 0 && (
          <p className="text-muted-foreground">No charities found</p>
        )}

        <div className="space-y-4 lg:w-2/3 max-h-[80vh] overflow-y-scroll p-4 pt-0 pl-0">
          {filteredCharities.map((charity) => (
            <CharityItem
              key={charity.id}
              charity={charity}
              onRefresh={fetchCharities}
            />
          ))}
        </div>
      </div>
    </div>
  );
}