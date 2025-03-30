-- CreateEnum
CREATE TYPE "ParticipationLevel" AS ENUM ('Very_Active', 'Active', 'Somewhat_Passive', 'Passive');

-- CreateEnum
CREATE TYPE "UnderstandingOfMaterial" AS ENUM ('Excellent', 'Good', 'Average', 'Needs_Improvement');

-- CreateTable
CREATE TABLE "StudentReview" (
    "id" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "dateOfClass" TEXT NOT NULL,
    "participationLevel" "ParticipationLevel" NOT NULL,
    "understandingOfMaterial" "UnderstandingOfMaterial" NOT NULL,
    "fluency" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "listeningSkills" TEXT NOT NULL,
    "otherRelevantSkills" TEXT NOT NULL,
    "topStrengths" TEXT NOT NULL,
    "whatStudentDidWell" TEXT NOT NULL,
    "areasOfImprovement" TEXT NOT NULL,
    "suggestionsForImprovement" TEXT NOT NULL,
    "additionalObservation" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "studentId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentReview_id_key" ON "StudentReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentReview_slug_key" ON "StudentReview"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "StudentReview_studentId_key" ON "StudentReview"("studentId");
