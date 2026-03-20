import { prisma } from "@/lib/prisma";

export const getAllCharities = async () => {
  return prisma.charity.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createCharity = async (data: {
  name: string;
  description: string;
  imageUrl?: string;
}) => {
  return prisma.charity.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl || null,
    },
  });
};

export const updateCharity = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    isFeatured?: boolean;
  }
) => {
  return prisma.charity.update({
    where: { id },
    data,
  });
};

export const deleteCharity = async (id: string) => {
  return prisma.charity.delete({
    where: { id },
  });
};