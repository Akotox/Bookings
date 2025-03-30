/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "ticketId";

-- CreateTable
CREATE TABLE "_MeetingTicketToSlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MeetingTicketToSlot_AB_unique" ON "_MeetingTicketToSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetingTicketToSlot_B_index" ON "_MeetingTicketToSlot"("B");

-- AddForeignKey
ALTER TABLE "_MeetingTicketToSlot" ADD CONSTRAINT "_MeetingTicketToSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "MeetingTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetingTicketToSlot" ADD CONSTRAINT "_MeetingTicketToSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
