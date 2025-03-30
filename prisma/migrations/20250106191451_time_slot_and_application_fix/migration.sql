/*
  Warnings:

  - The values [Beginner,Intermediate,A1,B2] on the enum `LanguageLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LanguageLevel_new" AS ENUM ('Native', 'Non_Native');
ALTER TABLE "Applicant" ALTER COLUMN "languageLevel" TYPE "LanguageLevel_new" USING ("languageLevel"::text::"LanguageLevel_new");
ALTER TYPE "LanguageLevel" RENAME TO "LanguageLevel_old";
ALTER TYPE "LanguageLevel_new" RENAME TO "LanguageLevel";
DROP TYPE "LanguageLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "meetsRequirement" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasApplied" BOOLEAN NOT NULL DEFAULT false;
