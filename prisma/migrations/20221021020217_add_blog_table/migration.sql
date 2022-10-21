/*
  Warnings:

  - A unique constraint covering the columns `[contentfulEntryId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "contentfulEntryId" VARCHAR(64) NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_contentfulEntryId_key" ON "Blog"("contentfulEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_contentfulEntryId_key" ON "Comment"("contentfulEntryId");
