-- CreateTable
CREATE TABLE "LessonDayConfig" (
    "id" TEXT NOT NULL,
    "lessonKey" TEXT NOT NULL,
    "availableDay" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonDayConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonDayConfig_lessonKey_key" ON "LessonDayConfig"("lessonKey");
