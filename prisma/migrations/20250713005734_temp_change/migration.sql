/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_creatorId_fkey";

-- DropIndex
DROP INDEX "Task_creatorId_idx";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "creatorId",
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "Task"("userId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
