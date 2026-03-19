import { prisma } from "@/lib/prisma";

export default async function WinnersPage() {
  const winners = await prisma.winner.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Winners</h1>

      <div className="space-y-2">
        {winners.map((w) => (
          <div
            key={w.id}
            className="p-3 border rounded flex justify-between"
          >
            <span>{w.user.email}</span>
            <span>₹{w.prizeAmount}</span>
            <span>{w.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}