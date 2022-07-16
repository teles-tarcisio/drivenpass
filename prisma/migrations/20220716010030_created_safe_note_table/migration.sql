-- CreateTable
CREATE TABLE "safenotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,

    CONSTRAINT "safenotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "safenotes_userId_title_key" ON "safenotes"("userId", "title");

-- AddForeignKey
ALTER TABLE "safenotes" ADD CONSTRAINT "safenotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
