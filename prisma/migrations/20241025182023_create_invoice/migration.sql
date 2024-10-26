-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('PENDIENTE', 'REGISTRADA', 'PAGADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "fechaActual" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" DOUBLE PRECISION NOT NULL,
    "CAE" TEXT NOT NULL,
    "fechaDeFactura" TIMESTAMP(3) NOT NULL,
    "numeroDeFactura" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
