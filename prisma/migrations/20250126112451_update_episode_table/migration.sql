/*
  Warnings:

  - You are about to drop the column `number` on the `Episode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[episodeNumber]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episodeNumber` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Episode` DROP COLUMN `number`,
    ADD COLUMN `episodeNumber` INTEGER NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Episode_episodeNumber_key` ON `Episode`(`episodeNumber`);
