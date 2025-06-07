-- CreateTable
CREATE TABLE "Cafe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagCafe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cafeId" INTEGER NOT NULL,

    CONSTRAINT "TagCafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItensPedido" (
    "id" SERIAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItensPedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagCafe" ADD CONSTRAINT "TagCafe_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensPedido" ADD CONSTRAINT "ItensPedido_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
