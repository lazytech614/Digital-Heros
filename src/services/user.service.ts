import { prisma } from "@/lib/prisma";

export async function getUsers(filters: any) {
  const { sort, subscription, contribution, charities } = filters;

  return prisma.user.findMany({
    where: {
      // ✅ Subscription filter (safe)
      ...(subscription && {
        subscriptionStatus: subscription,
      }),

      // ✅ Contribution >= filter (IMPORTANT FIX)
      ...(contribution && {
        contributionPct: {
          gte: Number(contribution),
        },
      }),

      // ✅ Charities filter (if exists)
      ...(charities?.length > 0 && {
        charities: {
          some: {
            id: {
              in: charities,
            },
          },
        },
      }),
    },

    orderBy: {
      createdAt: sort === "asc" ? "asc" : "desc",
    },

    include: {
      charities: true,
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