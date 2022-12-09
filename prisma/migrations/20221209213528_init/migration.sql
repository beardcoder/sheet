-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "race" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
