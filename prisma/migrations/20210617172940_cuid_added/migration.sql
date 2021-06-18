/*
  Warnings:

  - The primary key for the `author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reviewer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_authortobook` DROP FOREIGN KEY `_authortobook_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_authortobook` DROP FOREIGN KEY `_authortobook_ibfk_2`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_ibfk_2`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_ibfk_1`;

-- AlterTable
ALTER TABLE `_authortobook` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `author` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `book` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `reviewerId` VARCHAR(191) NOT NULL,
    MODIFY `bookId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviewer` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`reviewerId`) REFERENCES `Reviewer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToBook` ADD FOREIGN KEY (`A`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToBook` ADD FOREIGN KEY (`B`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
