-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "contentfulEntryId" VARCHAR(64) NOT NULL,
    "content" TEXT NOT NULL,
    "authorName" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "contentfulEntryId" VARCHAR(64) NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_contentfulEntryId_key" ON "Blog"("contentfulEntryId");
