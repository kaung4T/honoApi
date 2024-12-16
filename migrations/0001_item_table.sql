-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "quantity" DECIMAL NOT NULL
);
