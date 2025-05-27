import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  activo?: boolean;
  companyId?: string;
  nombreCompleto?: string;
  email?: string;
}

export const getAdminEmployees = async ({ 
  page = 1, 
  take = 12, 
  activo, 
  companyId, 
  nombreCompleto, 
  email 
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();
  if (!session || session.user.rol !== 'admin') {
    throw new Error('No se pudo obtener la sesión o no tienes permisos');
  }

  try {

    // 1. Obtener los companyId asociados al usuario
    const employeeCompanies = await prisma.employeeCompany.findMany({
      where: {
        employeeId: session.user.id,
      },
      select: {
        companyId: true,
      },
    });

    const companyIds = employeeCompanies.map((ec) => ec.companyId);

    // 2. Obtener empleados con sus compañías y aplicar los filtros
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
        companies: {
          some: {
            companyId: {
              in: companyIds,
            }
          }
        },
        correo: {
          contains: email,
          mode: 'insensitive',
        },
        rol: {
          not: 'administrator',
        },
        // no quiero que me devuelva el usuario logueado
        id: {
          not: session.user.id,
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

    // 3. Calcular el total de páginas
    const totalCount = await prisma.invoice.count({
      where: {
        companyId: {
          in: companyIds,
        },
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      employees: employees.map((employee) => ({
        ...employee,
        companies: employee.companies.map((relation) => relation.company),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo cargar las facturas');
  }
}