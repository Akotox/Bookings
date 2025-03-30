/*
  Warnings:

  - You are about to drop the column `endTime` on the `MeetingTicket` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `MeetingTicket` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `MeetingTicket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MeetingTicket" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "times";
