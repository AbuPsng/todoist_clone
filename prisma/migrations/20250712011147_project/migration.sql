/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TaskAssignee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assigneeId,taskId]` on the table `TaskAssignee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assigneeId` to the `TaskAssignee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignerId` to the `TaskAssignee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaskAssignee" DROP CONSTRAINT "TaskAssignee_userId_fkey";

-- DropIndex
DROP INDEX "TaskAssignee_userId_taskId_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskAssignee" DROP COLUMN "userId",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assigneeId" TEXT NOT NULL,
ADD COLUMN     "assignerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignee_assigneeId_taskId_key" ON "TaskAssignee"("assigneeId", "taskId");

-- AddForeignKey
ALTER TABLE "TaskAssignee" ADD CONSTRAINT "TaskAssignee_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignee" ADD CONSTRAINT "TaskAssignee_assignerId_fkey" FOREIGN KEY ("assignerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
