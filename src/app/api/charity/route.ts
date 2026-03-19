import { prisma } from "@/lib/prisma";

export async function GET() {
  const charities = await prisma.charity.findMany({
    where: { isFeatured: true },
  });

  return Response.json(charities);
}