/*
  Warnings:

  - You are about to drop the `member_has_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_has_book` DROP FOREIGN KEY `Member_Has_Book_bookCode_fkey`;

-- DropForeignKey
ALTER TABLE `member_has_book` DROP FOREIGN KEY `Member_Has_Book_memberCode_fkey`;

-- DropTable
DROP TABLE `member_has_book`;

-- CreateTable
CREATE TABLE `Borrow` (
    `memberCode` VARCHAR(191) NOT NULL,
    `bookCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Borrow_memberCode_bookCode_key`(`memberCode`, `bookCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Member`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `Book`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
