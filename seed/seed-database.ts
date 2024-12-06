
import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main () {

  // 1. Borrar registros previos
  // await Promise.all([
    await prisma.invoice.deleteMany();
    await prisma.employeeCompany.deleteMany();
    await prisma.company.deleteMany();
    await prisma.employee.deleteMany();
  // ]);

  const { invoices, companies, users } = initialData;

  // 2. Crear companies
  const companiesData = companies.map((company) => ({
    nombre: company.nombre,
    activo: company.activo
  }));
  await prisma.company.createMany({
    data: companiesData
  });

  const companiesDB = await prisma.company.findMany();

  // 3. Crear employees
  const usersData = users.map((user) => ({
    nombreCompleto: user.nombreCompleto,
    correo: user.correo,
    telefono: user.telefono,
    password: user.password,
    rol: user.rol,
    activo: user.activo,
  }));
  await prisma.employee.createMany({
    data: usersData
  });
  const employeesDB = await prisma.employee.findMany({include: {companies: true}});

  // 4. Crear employeeCompany
  const employeeCompanyData = companiesDB.map((company) => ({
    companyId: company.id,
    employeeId: employeesDB[0].id,
  }));
  await prisma.employeeCompany.createMany({
    data: employeeCompanyData
  });

  invoices.forEach( async (invoice) => {
    const { ...rest } = invoice;
    await prisma.invoice.create({
      data: { 
        ...rest,
        employeeId: employeesDB[0].id,
        companyId: companiesDB[0].id,
      },
    })
  });

  console.log('seed ejecutado correctamente');
}

(() => {
  if(process.env.NODE_ENV === 'production') return;

  main();
})();