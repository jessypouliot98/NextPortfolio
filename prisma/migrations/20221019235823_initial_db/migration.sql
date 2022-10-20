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
