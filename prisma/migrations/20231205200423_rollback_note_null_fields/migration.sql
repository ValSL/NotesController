/*
  Warnings:

  - Made the column `title` on table `note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `note` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NOT NULL;
