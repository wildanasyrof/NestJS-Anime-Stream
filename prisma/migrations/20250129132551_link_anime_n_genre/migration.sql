/*
  Warnings:

  - You are about to drop the column `passWord` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `a` on the `_AnimeGenres` table. All the data in the column will be lost.
  - You are about to drop the column `b` on the `_AnimeGenres` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[A,B]` on the table `_AnimeGenres` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `A` to the `_AnimeGenres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `B` to the `_AnimeGenres` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_AnimeGenres` DROP FOREIGN KEY `_AnimeGenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AnimeGenres` DROP FOREIGN KEY `_AnimeGenres_B_fkey`;

-- DropIndex
DROP INDEX `_AnimeGenres_AB_unique` ON `_AnimeGenres`;

-- DropIndex
DROP INDEX `_AnimeGenres_B_index` ON `_AnimeGenres`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `passWord`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_AnimeGenres` DROP COLUMN `a`,
    DROP COLUMN `b`,
    ADD COLUMN `A` INTEGER NOT NULL,
    ADD COLUMN `B` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `_AnimeGenres_AB_unique` ON `_AnimeGenres`(`A`, `B`);

-- CreateIndex
CREATE INDEX `_AnimeGenres_B_index` ON `_AnimeGenres`(`B`);

-- AddForeignKey
ALTER TABLE `_AnimeGenres` ADD CONSTRAINT `_AnimeGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimeGenres` ADD CONSTRAINT `_AnimeGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
