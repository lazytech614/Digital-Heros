import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const draws = await prisma.draw.findMany({
      orderBy: [
        { createdAt: "desc" },
      ],
      include: {
        winners: true,
      },
    });

    return NextResponse.json(draws);
  } catch (err) {
    console.error("GET DRAWS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch draws" },
      { status: 500 }
    );
  }
}