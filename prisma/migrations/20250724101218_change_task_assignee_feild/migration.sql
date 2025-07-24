/*
  Warnings:

  - Added the required column `projectId` to the `TaskAssignee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskAssignee" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskAssignee" ADD CONSTRAINT "TaskAssignee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
