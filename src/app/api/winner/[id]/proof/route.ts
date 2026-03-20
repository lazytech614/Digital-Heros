import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { proofUrl } = await req.json();

    const winner = await prisma.winner.update({
      where: { id: params.id },
      data: {
        proofUrl,
        status: "PENDING", // stays pending until admin verifies
      },
    });

    return NextResponse.json(winner);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to upload proof" },
      { status: 500 }
    );
  }
}