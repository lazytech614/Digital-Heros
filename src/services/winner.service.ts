import { prisma } from "@/lib/prisma";

function getMatchType(matchCount: number) {
  if (matchCount === 3) return "THREE";
  if (matchCount === 4) return "FOUR";
  if (matchCount === 5) return "FIVE";
  return null;
}

function getPrize(matchCount: number) {
  if (matchCount === 3) return 100;
  if (matchCount === 4) return 1000;
  if (matchCount === 5) return 10000;
  return 0;
}

export const winnerService = {
  async generateWinners(drawId: string) {
    // 1️⃣ Get results for this draw
    const results = await prisma.drawResult.findMany({
      where: { drawId },
    });

    const winners = [];

    // 2️⃣ Process each result
    for (const result of results) {
      const matchType = getMatchType(result.matchCount);

      if (!matchType) continue;

      // 🔥 Prevent duplicate winners
      const existing = await prisma.winner.findFirst({
        where: {
          userId: result.userId,
          drawId,
        },
      });

      if (existing) continue;

      // 3️⃣ Create winner
      const winner = await prisma.winner.create({
        data: {
          userId: result.userId,
          drawId,
          matchType,
          prizeAmount: getPrize(result.matchCount),
        },
      });

      winners.push(winner);
    }

    return {
      success: true,
      count: winners.length,
      winners,
    };
  },
};