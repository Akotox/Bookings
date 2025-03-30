/*
  Warnings:

  - You are about to drop the `_MeetingTicketToSlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MeetingTicketToSlot" DROP CONSTRAINT "_MeetingTicketToSlot_A_fkey";

-- DropForeignKey
ALTER TABLE "_MeetingTicketToSlot" DROP CONSTRAINT "_MeetingTicketToSlot_B_fkey";

-- AlterTable
ALTER TABLE "MeetingTicket" ADD COLUMN     "slots" TEXT[];

-- DropTable
DROP TABLE "_MeetingTicketToSlot";
