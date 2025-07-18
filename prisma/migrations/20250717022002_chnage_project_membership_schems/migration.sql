-- CreateEnum
CREATE TYPE "PROJECT_ROLE" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "ProjectMembership" ADD COLUMN     "inviterId" TEXT,
ADD COLUMN     "isInvited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "PROJECT_ROLE" NOT NULL DEFAULT 'MEMBER';

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
