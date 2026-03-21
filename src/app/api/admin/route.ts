import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Total Users
    const totalUsers = await prisma.user.count();

    // Total Prize Pool
    const totalPrizePool = await prisma.winner.aggregate({
      _sum: {
        prizeAmount: true,
      },
    });

    // Charity Contributions (based on contributionPct)
    const users = await prisma.user.findMany({
      select: {
        contributionPct: true,
        payments: {
          select: {
            amount: true,
          },
        },
      },
    });

    let totalCharity = 0;
    users.forEach((user) => {
      user.payments.forEach((payment) => {
        totalCharity += (payment.amount * user.contributionPct) / 100;
      });
    });

    // Draw statistics (winners per month)
    const draws = await prisma.draw.findMany({
      include: {
        winners: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const drawStats = draws.map((draw) => ({
      label: `${draw.month}/${draw.year}`,
      winners: draw.winners.length,
    }));

    return NextResponse.json({
      totalUsers,
      totalPrizePool: totalPrizePool._sum.prizeAmount || 0,
      totalCharity,
      drawStats,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching analytics" }, { status: 500 });
  }
}