-- CreateTable
CREATE TABLE "AdminInvoice" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concepto" TEXT NOT NULL,
    "notas" TEXT,
    "nombreArchivo" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "AdminInvoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminInvoice" ADD CONSTRAINT "AdminInvoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminInvoice" ADD CONSTRAINT "AdminInvoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
