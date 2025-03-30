-- CreateTable
CREATE TABLE "SyncScheduleApp" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "SyncScheduleApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SyncScheduleApp_clerkUserId_key" ON "SyncScheduleApp"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "SyncScheduleApp_email_key" ON "SyncScheduleApp"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SyncScheduleApp_teacherId_key" ON "SyncScheduleApp"("teacherId");

-- AddForeignKey
ALTER TABLE "SyncScheduleApp" ADD CONSTRAINT "SyncScheduleApp_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
