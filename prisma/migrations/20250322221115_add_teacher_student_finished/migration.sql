-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "studentFinished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "teacherFinished" BOOLEAN NOT NULL DEFAULT false;
