/*
  Warnings:

  - You are about to alter the column `authorName` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "authorName" SET DATA TYPE VARCHAR(100);
