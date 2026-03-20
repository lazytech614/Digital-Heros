/*
  Warnings:

  - You are about to drop the column `charityId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,drawId]` on the table `Winner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_charityId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "charityId",
ADD COLUMN     "billingInterval" "BillingInterval",
ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePeriod" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus";

-- CreateTable
CREATE TABLE "_UserCharities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserCharities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserCharities_B_index" ON "_UserCharities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Winner_userId_drawId_key" ON "Winner"("userId", "drawId");

-- AddForeignKey
ALTER TABLE "_UserCharities" ADD CONSTRAINT "_UserCharities_A_fkey" FOREIGN KEY ("A") REFERENCES "Charity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCharities" ADD CONSTRAINT "_UserCharities_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
