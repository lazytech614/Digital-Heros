import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/getUser";

export async function GET() {
  const user = await getOrCreateUser();

  const winners = await prisma.winner.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(winners);
}