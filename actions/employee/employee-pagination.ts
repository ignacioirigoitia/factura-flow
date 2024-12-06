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

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener empleados con sus compañías y aplicar el filtro companyId
    const employees = await prisma.employee.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        companies: {
          include: {
            company: true, // Incluye los datos de las compañías
          },
        },
      },
      where: {
        activo,
        nombreCompleto: {
          contains: nombreCompleto,
          mode: 'insensitive',
        },
        correo: {
          contains: email,
          mode: 'insensitive',
        },
        // Si se pasa un companyId, filtrar por esa compañía
        ...(companyId && {
          companies: {
            some: {
              companyId: companyId,
            },
          },
        }),
      },
      orderBy: {
        nombreCompleto: 'asc',
      },
    });

    // 2. Calcular total de páginas
    const totalCount = await prisma.employee.count({
      where: { activo },
    });
    const totalPages = Math.ceil(totalCount / take);

    // 3. Formatear respuesta
    return {
      currentPage: page,
      totalPages,
      employees: employees.map((employee) => ({
        ...employee,
        companies: employee.companies.map((relation) => relation.company), // Extraer solo las compañías
      })),
    };
  } catch (error) {
    throw new Error('No se pudo cargar los empleados');
  }
};
