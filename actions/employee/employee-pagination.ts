'use server';

import prisma from "@/lib/prisma";


interface PaginationOptions {
  page?: number;
  take?: number;
  activo?: boolean;
  companyId?: string;
  nombreCompleto?: string;
  email?: string;
}

export const getPaginatedEmployee = async ({ 
  page = 1, 
  take = 12,
  activo,
  companyId,
  nombreCompleto,
  email
}: PaginationOptions) => {

  if( isNaN( Number(page)) ) page = 1;
  if( page < 1 ) page = 1;

  try {
    //1. Get employees
    const employees = await prisma.employee.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        Company: true
      },
      where: {
        activo: activo,
        companyId: companyId,
        nombreCompleto: {
          contains: nombreCompleto,
          mode: 'insensitive'
        },
        correo: {
          contains: email,
          mode: 'insensitive'
        }
      },
      orderBy: {
        nombreCompleto: 'asc'
      }
    });

    //2. get total pages
    const totalCount = await prisma.employee.count({
      where: { activo }
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: 1,
      totalPages: totalPages,
      employees: employees.map(x => ({
        ...x,
        company: x.Company ?? undefined
      }))
    }
  } catch (error) {
    throw new Error('No se pudo cargar los empleados');;
  }
}
