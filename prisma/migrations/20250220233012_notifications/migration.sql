-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('StudentReview', 'Class_Schedule', 'Trial_class');

-- CreateTable
CREATE TABLE "TeacherNotification" (
    "id" TEXT NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "teacherId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherNotification_id_key" ON "TeacherNotification"("id");

-- AddForeignKey
ALTER TABLE "TeacherNotification" ADD CONSTRAINT "TeacherNotification_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
