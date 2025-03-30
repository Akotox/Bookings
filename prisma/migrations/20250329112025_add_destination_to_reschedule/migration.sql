-- CreateEnum
CREATE TYPE "Destination" AS ENUM ('TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "Reschedule" ADD COLUMN     "destination" "Destination" NOT NULL DEFAULT 'TEACHER';
