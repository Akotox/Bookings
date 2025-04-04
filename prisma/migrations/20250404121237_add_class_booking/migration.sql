-- CreateTable
CREATE TABLE "ClassBooking" (
    "id" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "classCode" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdClassCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassBooking_pkey" PRIMARY KEY ("id")
);
