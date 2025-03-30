ALTER TABLE "schedules" DROP CONSTRAINT "schedules_appUserId_unique";--> statement-breakpoint
ALTER TABLE "schedules" DROP COLUMN IF EXISTS "appUserId";