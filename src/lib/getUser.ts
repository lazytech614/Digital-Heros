import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getOrCreateUser() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: `${userId}@temp.com`, // temp fallback
      },
    });
  }

  return user;
}