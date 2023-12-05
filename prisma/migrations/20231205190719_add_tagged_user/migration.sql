/*
  Warnings:

  - You are about to drop the `notesonusers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notesonusers` DROP FOREIGN KEY `NotesOnUsers_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `notesonusers` DROP FOREIGN KEY `NotesOnUsers_userId_fkey`;

-- AlterTable
ALTER TABLE `note` ADD COLUMN `tagUserId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `notesonusers`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_tagUserId_fkey` FOREIGN KEY (`tagUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
