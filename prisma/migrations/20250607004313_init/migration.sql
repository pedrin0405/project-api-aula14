/*
  Warnings:

  - You are about to drop the column `name` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `Cafe` table. All the data in the column will be lost.
  - The `tipo` column on the `Cafe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ItensPedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagCafe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco_unitario` to the `Cafe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tiposCafe" AS ENUM ('FORTE', 'SUAVE', 'ESPECIAL');

-- CreateEnum
CREATE TYPE "StatusEntrega" AS ENUM ('PENDENTE', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO');

-- DropForeignKey
ALTER TABLE "ItensPedido" DROP CONSTRAINT "ItensPedido_cafeId_fkey";

-- DropForeignKey
ALTER TABLE "TagCafe" DROP CONSTRAINT "TagCafe_cafeId_fkey";

-- AlterTable
ALTER TABLE "Cafe" DROP COLUMN "name",
DROP COLUMN "preco",
ADD COLUMN     "data_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_updated" TIMESTAMP(3),
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "preco_unitario" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "tiposCafe" NOT NULL DEFAULT 'FORTE',
ALTER COLUMN "descricao" DROP NOT NULL;

-- DropTable
DROP TABLE "ItensPedido";

-- DropTable
DROP TABLE "TagCafe";

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_pedido" DOUBLE PRECISION,
    "status" "StatusEntrega" NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" SERIAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemPedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrega" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "endereco_entrega" TEXT NOT NULL,
    "status" "StatusEntrega" NOT NULL,
    "data_prevista_entrega" TIMESTAMP(3),

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_pedidoId_key" ON "Entrega"("pedidoId");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
