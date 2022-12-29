/*
  Warnings:

  - You are about to drop the column `subject` on the `Mail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "subject",
ADD COLUMN     "referral" VARCHAR(255);
