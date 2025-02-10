/*
  Warnings:

  - A unique constraint covering the columns `[music-id,tone]` on the table `Version` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Version_music-id_tone_key" ON "Version"("music-id", "tone");
