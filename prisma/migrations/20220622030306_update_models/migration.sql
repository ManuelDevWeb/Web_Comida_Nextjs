/*
  Warnings:

  - You are about to drop the column `preio` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Producto` DROP COLUMN `preio`,
    ADD COLUMN `precio` DOUBLE NOT NULL;
