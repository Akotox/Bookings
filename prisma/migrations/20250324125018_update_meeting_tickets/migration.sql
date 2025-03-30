-- AlterEnum
ALTER TYPE "TicketStatus" ADD VALUE 'RESCHEDULE';

-- AlterTable
ALTER TABLE "MeetingTicket" ADD COLUMN     "meetingId" TEXT,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
