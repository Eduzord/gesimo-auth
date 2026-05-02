-- CreateTable
CREATE TABLE `Roles` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(150) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `id_role` INTEGER NOT NULL,

    UNIQUE INDEX `uk_usuario_email`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Roles`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;
