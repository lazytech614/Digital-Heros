import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const user = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      name: body.name,
      contributionPct: body.contributionPct,
    },
  });

  return NextResponse.json(user);
}