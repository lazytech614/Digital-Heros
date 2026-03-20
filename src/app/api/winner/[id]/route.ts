import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  const formData = await req.formData();
  const action = formData.get("action");

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

    return NextResponse.redirect(new URL("/admin/winners", req.url));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}