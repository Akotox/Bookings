/*
  Warnings:

  - Added the required column `studentTimeZone` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherTimeZone` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "studentTimeZone" TEXT NOT NULL,
ADD COLUMN     "teacherTimeZone" TEXT NOT NULL;
