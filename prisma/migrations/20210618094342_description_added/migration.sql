/*
  Warnings:

  - You are about to drop the column `createdAt` on the `reviewer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `description` VARCHAR(240) NOT NULL;

-- AlterTable
ALTER TABLE `reviewer` DROP COLUMN `createdAt`;

-- CreateIndex
CREATE UNIQUE INDEX `Book.isbn_unique` ON `Book`(`isbn`);
