/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `Watchlistitem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Watchlistitem_userId_movieId_key" ON "Watchlistitem"("userId", "movieId");
