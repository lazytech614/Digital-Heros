import { prisma } from "@/lib/prisma";

export default async function CharitiesPage() {
  const charities = await prisma.charity.findMany();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Charities</h1>

      {charities.map((c) => (
        <div key={c.id} className="p-3 border rounded mb-2">
          <h3 className="font-semibold">{c.name}</h3>
          <p className="text-sm text-muted-foreground">
            {c.description}
          </p>
        </div>
      ))}
    </div>
  );
}