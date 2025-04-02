/*
  Warnings:

  - Made the column `classCode` on table `ClassBundle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClassBundle" ALTER COLUMN "classCode" SET NOT NULL,
ALTER COLUMN "classCode" SET DEFAULT 'TR';
