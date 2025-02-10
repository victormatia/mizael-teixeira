-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(16) NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenderToMusic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GenderToMusic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gender_name_key" ON "Gender"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Music_name_key" ON "Music"("name");

-- CreateIndex
CREATE INDEX "_GenderToMusic_B_index" ON "_GenderToMusic"("B");

-- AddForeignKey
ALTER TABLE "_GenderToMusic" ADD CONSTRAINT "_GenderToMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "Gender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderToMusic" ADD CONSTRAINT "_GenderToMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
