"use client";

import { useEffect, useState } from "react";

export default function CharitySection() {
  const [charities, setCharities] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/charity")
      .then((res) => res.json())
      .then(setCharities);
  }, []);

  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-2xl font-semibold mb-8">
        Support Charities ❤️
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {charities.map((c) => (
          <div key={c.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-sm text-muted-foreground">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}