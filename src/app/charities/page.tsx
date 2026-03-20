import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import CharitiesClient from "./charities-client";

export default async function CharitiesPage() {
  const { userId } = await auth();

  let supportedCharityIds: string[] = [];

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        charities: {
          select: { id: true },
        },
      },
    });

    supportedCharityIds =
      user?.charities.map((c) => c.id) || [];
  }

  const charities = await prisma.charity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <CharitiesClient
      charities={charities}
      supportedCharityIds={supportedCharityIds}
    />
  );
}