import { prisma } from "@/lib/prisma";

export async function getUsers(filters: any) {
  const { sort, subscription, contribution, charities, name } = filters;

  return prisma.user.findMany({
    where: {
      ...(subscription && {
        subscriptionStatus: subscription,
      }),
      ...(contribution && {
        contributionPct: {
          gte: Number(contribution),
        },
      }),
      ...(charities?.length > 0 && {
        charities: {
          some: {
            id: {
              in: charities,
            },
          },
        },
      }),
      ...(name && name.trim() !== "" && {
        name: {
          contains: name.trim(),
          mode: "insensitive", 
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
  const subscription = await prisma.subscription.findUnique({
    where: { userId: id },
  });

  if (subscription) {
    await prisma.subscription.delete({
      where: { id: subscription.id },
    });
  }

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