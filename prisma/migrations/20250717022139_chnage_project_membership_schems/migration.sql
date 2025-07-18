/*
  Warnings:

  - You are about to drop the column `userId` on the `ProjectMembership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teammateId,projectId]` on the table `ProjectMembership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teammateId` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_userId_fkey";

-- DropIndex
DROP INDEX "ProjectMembership_userId_projectId_key";

-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "userId",
ADD COLUMN     "teammateId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMembership_teammateId_projectId_key" ON "ProjectMembership"("teammateId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_teammateId_fkey" FOREIGN KEY ("teammateId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
