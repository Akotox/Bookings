-- CreateTable
CREATE TABLE "TeacherEarnings" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "withdrawable" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "withdrawn" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeacherEarnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningsRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeInvoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherEarningsId" TEXT NOT NULL,

    CONSTRAINT "EarningsRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WithdrawalRecord" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherEarningsId" TEXT NOT NULL,

    CONSTRAINT "WithdrawalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepositRecord" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherEarningsId" TEXT NOT NULL,

    CONSTRAINT "DepositRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EarningsRecord_stripeInvoiceId_key" ON "EarningsRecord"("stripeInvoiceId");

-- AddForeignKey
ALTER TABLE "EarningsRecord" ADD CONSTRAINT "EarningsRecord_teacherEarningsId_fkey" FOREIGN KEY ("teacherEarningsId") REFERENCES "TeacherEarnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawalRecord" ADD CONSTRAINT "WithdrawalRecord_teacherEarningsId_fkey" FOREIGN KEY ("teacherEarningsId") REFERENCES "TeacherEarnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositRecord" ADD CONSTRAINT "DepositRecord_teacherEarningsId_fkey" FOREIGN KEY ("teacherEarningsId") REFERENCES "TeacherEarnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
