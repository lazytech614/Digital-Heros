import { currentUser } from "@clerk/nextjs/server";

export async function isAdmin() {
  const user = await currentUser();

  return user?.emailAddresses[0].emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}