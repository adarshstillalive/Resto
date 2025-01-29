-- CreateTable
CREATE TABLE "Restaurant" (
    "restoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restoId")
);
