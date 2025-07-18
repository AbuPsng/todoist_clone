/*
  Warnings:

  - You are about to drop the column `status` on the `ProjectMembership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "status";

-- DropEnum
DROP TYPE "PROJECT_MEMBERSHIP_STATUS";
