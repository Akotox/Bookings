/*
  Warnings:

  - You are about to drop the column `teacherEmail` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentReview" ADD COLUMN     "teacherEmail" TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "teacherEmail";
