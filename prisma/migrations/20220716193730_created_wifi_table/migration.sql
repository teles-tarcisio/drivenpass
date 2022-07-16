-- CreateTable
CREATE TABLE "wifinetworks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "ssid" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "wifinetworks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wifinetworks" ADD CONSTRAINT "wifinetworks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
