/*
  Warnings:

  - Added the required column `slotId` to the `MeetingTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MeetingTicket" ADD COLUMN     "slotId" TEXT NOT NULL;
