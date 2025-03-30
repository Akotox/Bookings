-- CreateEnum
CREATE TYPE "RescheduleStatus" AS ENUM ('PENDING', 'APPROVED', 'REVOKED');

-- CreateTable
CREATE TABLE "Reschedule" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "status" "RescheduleStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Reschedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reschedule_meetingId_key" ON "Reschedule"("meetingId");

-- CreateIndex
CREATE INDEX "Reschedule_studentId_teacherId_month_year_idx" ON "Reschedule"("studentId", "teacherId", "month", "year");
