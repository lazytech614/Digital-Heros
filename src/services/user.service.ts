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
  // 1. Find subscription
  const subscription = await prisma.subscription.findUnique({
    where: { userId: id },
  });

  // 2. Delete subscription if exists
  if (subscription) {
    await prisma.subscription.delete({
      where: { id: subscription.id },
    });
  }

  // 3. Update user (VERY IMPORTANT)
  return prisma.user.update({
    where: { id },
    data: {
      subscriptionStatus: "CANCELLED",
      billingInterval: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      stripeCurrentPeriodEnd: null,
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