-- CreateTable
CREATE TABLE `Anime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `altTitles` VARCHAR(191) NULL,
    `chapters` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `synopsis` VARCHAR(191) NOT NULL,
    `imageSource` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnimeGenres` (
    `a` INTEGER NOT NULL,
    `b` INTEGER NOT NULL,

    UNIQUE INDEX `_AnimeGenres_AB_unique`(`a`, `b`),
    INDEX `_AnimeGenres_B_index`(`b`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AnimeGenres` ADD CONSTRAINT `_AnimeGenres_A_fkey` FOREIGN KEY (`a`) REFERENCES `Anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimeGenres` ADD CONSTRAINT `_AnimeGenres_B_fkey` FOREIGN KEY (`b`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
