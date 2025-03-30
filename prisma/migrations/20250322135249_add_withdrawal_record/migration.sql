-- CreateTable
CREATE TABLE "WithdrawalRecord" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "withdrawalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "WithdrawalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "one_withdrawal_per_month" ON "WithdrawalRecord"("teacherId");

-- AddForeignKey
ALTER TABLE "WithdrawalRecord" ADD CONSTRAINT "WithdrawalRecord_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeacherEarnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
