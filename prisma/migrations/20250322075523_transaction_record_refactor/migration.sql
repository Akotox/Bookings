/*
  Warnings:

  - You are about to drop the `DepositRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EarningsRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WithdrawalRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EARNING', 'WITHDRAWAL', 'DEPOSIT');

-- DropForeignKey
ALTER TABLE "DepositRecord" DROP CONSTRAINT "DepositRecord_teacherEarningsId_fkey";

-- DropForeignKey
ALTER TABLE "EarningsRecord" DROP CONSTRAINT "EarningsRecord_teacherEarningsId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawalRecord" DROP CONSTRAINT "WithdrawalRecord_teacherEarningsId_fkey";

-- DropTable
DROP TABLE "DepositRecord";

-- DropTable
DROP TABLE "EarningsRecord";

-- DropTable
DROP TABLE "WithdrawalRecord";

-- CreateTable
CREATE TABLE "TransactionRecord" (
    "id" TEXT NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "userId" TEXT,
    "stripeInvoiceId" TEXT,
    "stripeTransferId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherEarningsId" TEXT NOT NULL,

    CONSTRAINT "TransactionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionRecord_stripeInvoiceId_key" ON "TransactionRecord"("stripeInvoiceId");

-- AddForeignKey
ALTER TABLE "TransactionRecord" ADD CONSTRAINT "TransactionRecord_teacherEarningsId_fkey" FOREIGN KEY ("teacherEarningsId") REFERENCES "TeacherEarnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
