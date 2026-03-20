import { prisma } from "@/lib/prisma";

function generateNumbers(): number[] {
  const set = new Set<number>();

  while (set.size < 5) {
    const num = Math.floor(Math.random() * 10) + 1;
    set.add(num);
  }

  return Array.from(set);
}

function countMatches(userNumbers: number[], drawNumbers: number[]) {
  return userNumbers.filter((n) => drawNumbers.includes(n)).length;
}

export const drawService = {
  async runMonthlyDraw() {
    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const numbers = generateNumbers();

    const draw = await prisma.draw.create({
      data: {
        month,
        year,
        numbers,
        type: "RANDOM",
        isPublished: true,
      },
    });

    const users = await prisma.user.findMany({
      include: {
        scores: true,
      },
    });

    for (const user of users) {
      const userNumbers = user.scores.map((s) => s.value);

      if (userNumbers.length === 0) continue;

      const matchCount = countMatches(userNumbers, numbers);

      if (matchCount >= 3) {
        await prisma.drawResult.create({
          data: {
            drawId: draw.id,
            userId: user.id,
            matchCount,
          },
        });
      }
    }

    return draw;
  },
};