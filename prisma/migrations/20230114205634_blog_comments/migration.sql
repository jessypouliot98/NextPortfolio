/*
  Warnings:

  - You are about to drop the column `contentfulEntryId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `blogId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "contentfulEntryId",
ADD COLUMN     "blogId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
