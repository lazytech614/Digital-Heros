import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import DrawsClient from "./draws-client";

export default async function DrawsPage() {
  const { userId } = await auth();

  let dbUserId: string | null = null;

  if (userId) {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    dbUserId = dbUser?.id ?? null;
  }

  const draws = await prisma.draw.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: {
      winners: true,
    },
  });

  return <DrawsClient draws={draws} currentUserId={dbUserId} />;
}