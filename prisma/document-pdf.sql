CREATE TABLE IF NOT EXISTS `DocumentPdf` (
    `documentId` INTEGER NOT NULL,
    `data` LONGBLOB NOT NULL,
    PRIMARY KEY (`documentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
