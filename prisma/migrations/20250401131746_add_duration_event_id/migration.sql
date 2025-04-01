-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "eventId" TEXT;
