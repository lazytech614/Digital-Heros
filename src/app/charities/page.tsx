import { prisma } from "@/lib/prisma";
import CharitiesClient from "./charities-client";

export default async function CharitiesPage() {
  const charities = await prisma.charity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <CharitiesClient charities={charities} />;
}