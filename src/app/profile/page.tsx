import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import ProfileHeader from "@/components/profile/profile-header";
import ProfileDetails from "@/components/profile/profile-details";
import ProfileCharities from "@/components/profile/profile-charities";
import ProfileScores from "@/components/profile/profile-scores";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      charities: true,
      scores: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 mt-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <ProfileHeader user={user} />
        <ProfileDetails user={user} />
        <ProfileCharities charities={user.charities} />
        <ProfileScores scores={user.scores} />
      </div>
    </div>
  );
}