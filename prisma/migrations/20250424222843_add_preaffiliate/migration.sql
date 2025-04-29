/*
  Warnings:

  - You are about to drop the column `timeZone` on the `Applicant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "timeZone";

-- CreateTable
CREATE TABLE "PreAffiliate" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,

    CONSTRAINT "PreAffiliate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreAffiliate_emailAddress_key" ON "PreAffiliate"("emailAddress");
