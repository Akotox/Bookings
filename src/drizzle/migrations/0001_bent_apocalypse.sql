ALTER TABLE "schedules" ADD COLUMN "appUserId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_appUserId_unique" UNIQUE("appUserId");