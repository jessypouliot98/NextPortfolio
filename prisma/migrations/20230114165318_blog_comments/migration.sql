-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_contentfulEntryId_fkey" FOREIGN KEY ("contentfulEntryId") REFERENCES "Blog"("contentfulEntryId") ON DELETE RESTRICT ON UPDATE CASCADE;
