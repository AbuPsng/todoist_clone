/*
  Warnings:

  - You are about to drop the column `role` on the `InviteToken` table. All the data in the column will be lost.
  - Made the column `inviterId` on table `InviteToken` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "INVITE_STATUS" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "InviteToken" DROP CONSTRAINT "InviteToken_inviterId_fkey";

-- DropForeignKey
ALTER TABLE "InviteToken" DROP CONSTRAINT "InviteToken_projectId_fkey";

-- AlterTable
ALTER TABLE "InviteToken" DROP COLUMN "role",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "status" "INVITE_STATUS" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "inviterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InviteToken" ADD CONSTRAINT "InviteToken_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteToken" ADD CONSTRAINT "InviteToken_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteToken" ADD CONSTRAINT "InviteToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
