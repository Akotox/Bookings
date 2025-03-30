-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('REGULAR', 'TRIAL');

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "isTaken" BOOLEAN NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classType" "ClassType" NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);
