import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { action } = await req.json();

  try {
    if (action === "approve") {
      await prisma.winner.update({
        where: { id },
        data: { status: "APPROVED" },
      });
    }

    if (action === "reject") {
      await prisma.winner.update({
        where: { id },
        data: { status: "REJECTED" },
      });
    }

    return NextResponse.json({ success: true }); // 🔥 no redirect
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}