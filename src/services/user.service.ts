import { prisma } from "@/lib/prisma";

export async function getUsers(filters: any) {
  return prisma.user.findMany({
    where: {
      subscription: filters.subscription || undefined,
      contributionPct: filters.contribution
        ? Number(filters.contribution)
        : undefined,
      charities: filters.charities.length
        ? {
            some: {
              id: { in: filters.charities },
            },
          }
        : undefined,
    },
    include: {
      charities: true,
    },
    orderBy: {
      createdAt: filters.sort === "asc" ? "asc" : "desc",
    },
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}

export async function cancelSubscription(id: string) {
  return prisma.user.update({
    where: { id },
    data: { 
        subscription: { 
            disconnect: true 
        } 
    },
  });
}

export async function cancelCharity(userId: string, charityId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      charities: {
        disconnect: { id: charityId },
      },
    },
  });
}