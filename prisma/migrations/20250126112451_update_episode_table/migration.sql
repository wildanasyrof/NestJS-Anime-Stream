/*
  Warnings:

  - You are about to drop the column `number` on the `Episode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[episode_number]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episode_number` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Episode` DROP COLUMN `number`,
    ADD COLUMN `episode_number` INTEGER NOT NULL,
    ADD COLUMN `video_url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Episode_episode_number_key` ON `Episode`(`episode_number`);
