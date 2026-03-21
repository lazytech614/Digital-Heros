import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", success: false }, { status: 401 });
    }

    const { charityId, action } = await req.json();

    if(!charityId) {
      return NextResponse.json({ error: "Charity ID is required", success: false }, { status: 400 });
    }

    if(!action) {
      return NextResponse.json({ error: "Action is required", success: false }, { status: 400 });
    }

    if (!["add", "remove"].includes(action)) {
      return NextResponse.json(
        { error: "Action must be 'add' or 'remove'", success: false },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { charities: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found", success: false }, { status: 404 });
    }

    if (user.subscriptionStatus !== "ACTIVE") {
      return NextResponse.json(
        { error: "Active subscription required", success: false },
        { status: 403 }
      );
    }

    const alreadyAdded = user.charities.some((c) => c.id === charityId);

    if (action === "add") {
      if (alreadyAdded) {
        return NextResponse.json(
          { error: "Charity already supported", success: false },
          { status: 400 }
        );
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { charities: { connect: { id: charityId } } },
      });

      return NextResponse.json({
        success: true,
        message: "Charity supported successfully",
      });
    } else if (action === "remove") {
      if (!alreadyAdded) {
        return NextResponse.json(
          { error: "Charity not currently supported", success: false },
          { status: 400 }
        );
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { charities: { disconnect: { id: charityId } } },
      });

      return NextResponse.json({
        success: true,
        message: "Charity support withdrawn successfully",
      });
    }
  } catch (err) {
    console.error("CHARITY SUPPORT ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}