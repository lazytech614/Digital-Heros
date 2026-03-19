import { prisma } from "@/lib/prisma";

export const scoreService = {
  async addScore(userId: string, value: number, playedAt: Date) {
    if (value < 1 || value > 45) {
      throw new Error("Score must be between 1 and 45");
    }

    // 1. Create score
    await prisma.score.create({
      data: {
        userId,
        value,
        playedAt,
      },
    });

    // 2. Get latest scores
    const scores = await prisma.score.findMany({
      where: { userId },
      orderBy: { playedAt: "desc" },
    });

    // 3. Keep only latest 5
    if (scores.length > 5) {
      const toDelete = scores.slice(5);

      await prisma.score.deleteMany({
        where: {
          id: {
            in: toDelete.map((s) => s.id),
          },
        },
      });
    }

    return { success: true };
  },

  async getScores(userId: string) {
    return prisma.score.findMany({
      where: { userId },
      orderBy: { playedAt: "desc" },
    });
  },
};