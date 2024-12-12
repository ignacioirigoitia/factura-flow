/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,companyId]` on the table `EmployeeCompany` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmployeeCompany_employeeId_companyId_key" ON "EmployeeCompany"("employeeId", "companyId");
