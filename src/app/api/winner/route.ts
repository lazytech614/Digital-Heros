import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const winners = await prisma.winner.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(winners);
}