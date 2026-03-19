import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getOrCreateUser() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId) throw new Error("Unauthorized");

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        name: clerkUser?.firstName + " " + clerkUser?.lastName || "Anonymous",
        email: clerkUser?.emailAddresses[0].emailAddress || "empty@gmail.com", 
      },
    });
  }

  return user;
}