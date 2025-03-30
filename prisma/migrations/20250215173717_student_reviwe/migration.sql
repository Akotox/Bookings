-- AlterTable
ALTER TABLE "StudentReview" ADD COLUMN     "LogicalReasoning" TEXT,
ADD COLUMN     "accuracyInCalculation" TEXT,
ADD COLUMN     "creativityInWriting" TEXT,
ADD COLUMN     "knowledgeRetention" TEXT,
ADD COLUMN     "problemSolvingSkills" TEXT,
ADD COLUMN     "problemSolvingSpeed" TEXT,
ADD COLUMN     "textAnalysisTechniques" TEXT,
ADD COLUMN     "understandingOfJapaneseculture" TEXT,
ADD COLUMN     "understandingTheVietnamesCulturalContext" TEXT,
ALTER COLUMN "fluency" DROP NOT NULL,
ALTER COLUMN "pronunciation" DROP NOT NULL,
ALTER COLUMN "listeningSkills" DROP NOT NULL,
ALTER COLUMN "otherRelevantSkills" DROP NOT NULL;
