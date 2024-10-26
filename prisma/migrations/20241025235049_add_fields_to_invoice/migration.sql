/*
  Warnings:

  - A unique constraint covering the columns `[CAE]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numeroDeFactura]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "notas" TEXT,
ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_CAE_key" ON "Invoice"("CAE");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_numeroDeFactura_key" ON "Invoice"("numeroDeFactura");
