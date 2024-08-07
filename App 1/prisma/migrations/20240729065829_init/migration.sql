-- CreateTable
CREATE TABLE `Member` (
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `code` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member_Has_Book` (
    `memberCode` VARCHAR(191) NOT NULL,
    `bookCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Member_Has_Book_memberCode_bookCode_key`(`memberCode`, `bookCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member_Has_Book` ADD CONSTRAINT `Member_Has_Book_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Member`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member_Has_Book` ADD CONSTRAINT `Member_Has_Book_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `Book`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
