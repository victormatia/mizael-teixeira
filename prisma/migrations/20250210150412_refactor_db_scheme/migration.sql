/*
  Warnings:

  - The primary key for the `Gender` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Music` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_GenderToMusic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenderToMusic" DROP CONSTRAINT "_GenderToMusic_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenderToMusic" DROP CONSTRAINT "_GenderToMusic_B_fkey";

-- AlterTable
ALTER TABLE "Gender" DROP CONSTRAINT "Gender_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gender_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gender_id_seq";

-- AlterTable
ALTER TABLE "Music" DROP CONSTRAINT "Music_pkey",
ADD COLUMN     "autor" TEXT NOT NULL DEFAULT 'Desconhecido',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Music_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Music_id_seq";

-- DropTable
DROP TABLE "_GenderToMusic";

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "music-id" TEXT NOT NULL,
    "tone" VARCHAR(6) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenderToMusic" (
    "gender-id" TEXT NOT NULL,
    "music-id" TEXT NOT NULL,

    CONSTRAINT "genderToMusicPk" PRIMARY KEY ("gender-id","music-id")
);

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_music-id_fkey" FOREIGN KEY ("music-id") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenderToMusic" ADD CONSTRAINT "GenderToMusic_gender-id_fkey" FOREIGN KEY ("gender-id") REFERENCES "Gender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenderToMusic" ADD CONSTRAINT "GenderToMusic_music-id_fkey" FOREIGN KEY ("music-id") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
