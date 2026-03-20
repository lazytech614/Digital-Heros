import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    // ❌ Not logged in
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { charityId } = await req.json();

    if (!charityId) {
      return NextResponse.json(
        { error: "Charity ID required" },
        { status: 400 }
      );
    }

    // ✅ Get DB user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { charities: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ❌ Check subscription
    if (user.subscriptionStatus !== "ACTIVE") {
      return NextResponse.json(
        { error: "Active subscription required" },
        { status: 403 }
      );
    }

    // ❌ Prevent duplicate
    const alreadyAdded = user.charities.some(
      (c) => c.id === charityId
    );

    if (alreadyAdded) {
      return NextResponse.json(
        { error: "Charity already selected" },
        { status: 400 }
      );
    }

    // ✅ Add charity
    await prisma.user.update({
      where: { id: user.id },
      data: {
        charities: {
          connect: { id: charityId },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Charity supported successfully",
    });
  } catch (err) {
    console.error("SUPPORT CHARITY ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}