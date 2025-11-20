/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_user` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nama_user` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_user`);

-- CreateTable
CREATE TABLE `bahan` (
    `id_bahan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bahan` VARCHAR(191) NOT NULL,
    `satuan` VARCHAR(191) NULL,

    PRIMARY KEY (`id_bahan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_resep` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resep` (
    `id_resep` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_kategori` INTEGER NOT NULL,
    `nama_resep` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `langkah_memasak` VARCHAR(191) NULL,
    `waktu_memasak` INTEGER NULL,
    `foto_resep` VARCHAR(191) NULL,
    `tanggal_ditambahkan` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `resep_id_user_idx`(`id_user`),
    INDEX `resep_id_kategori_idx`(`id_kategori`),
    PRIMARY KEY (`id_resep`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bahan_resep` (
    `id_resep_bahan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_bahan` INTEGER NOT NULL,
    `id_resep` INTEGER NOT NULL,
    `takaran` VARCHAR(191) NULL,

    INDEX `bahan_resep_id_bahan_idx`(`id_bahan`),
    INDEX `bahan_resep_id_resep_idx`(`id_resep`),
    PRIMARY KEY (`id_resep_bahan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_input` (
    `id_user_input` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_bahan` INTEGER NOT NULL,
    `tanggal_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_input_id_user_idx`(`id_user`),
    INDEX `user_input_id_bahan_idx`(`id_bahan`),
    PRIMARY KEY (`id_user_input`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorit_resep` (
    `id_favorit_resep` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_resep` INTEGER NOT NULL,
    `tanggal_disimpan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `favorit_resep_id_user_idx`(`id_user`),
    INDEX `favorit_resep_id_resep_idx`(`id_resep`),
    UNIQUE INDEX `uniq_user_resep_fav`(`id_user`, `id_resep`),
    PRIMARY KEY (`id_favorit_resep`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentar_rating` (
    `id_komentar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_resep` INTEGER NOT NULL,
    `isi_komentar` VARCHAR(191) NULL,
    `rating` INTEGER NULL,
    `tanggal_komentar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `komentar_rating_id_user_idx`(`id_user`),
    INDEX `komentar_rating_id_resep_idx`(`id_resep`),
    PRIMARY KEY (`id_komentar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usulan_bahan` (
    `id_usulan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nama_bahan` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL,
    `tanggal_usul` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `usulan_bahan_id_user_idx`(`id_user`),
    PRIMARY KEY (`id_usulan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resep` ADD CONSTRAINT `resep_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep` ADD CONSTRAINT `resep_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_resep`(`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bahan_resep` ADD CONSTRAINT `bahan_resep_id_bahan_fkey` FOREIGN KEY (`id_bahan`) REFERENCES `bahan`(`id_bahan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bahan_resep` ADD CONSTRAINT `bahan_resep_id_resep_fkey` FOREIGN KEY (`id_resep`) REFERENCES `resep`(`id_resep`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_input` ADD CONSTRAINT `user_input_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_input` ADD CONSTRAINT `user_input_id_bahan_fkey` FOREIGN KEY (`id_bahan`) REFERENCES `bahan`(`id_bahan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorit_resep` ADD CONSTRAINT `favorit_resep_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorit_resep` ADD CONSTRAINT `favorit_resep_id_resep_fkey` FOREIGN KEY (`id_resep`) REFERENCES `resep`(`id_resep`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar_rating` ADD CONSTRAINT `komentar_rating_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar_rating` ADD CONSTRAINT `komentar_rating_id_resep_fkey` FOREIGN KEY (`id_resep`) REFERENCES `resep`(`id_resep`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usulan_bahan` ADD CONSTRAINT `usulan_bahan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

