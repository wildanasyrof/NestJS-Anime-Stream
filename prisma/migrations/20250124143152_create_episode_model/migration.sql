-- CreateTable
CREATE TABLE `Episode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `anime_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
