'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getAdminPaginatedInvoices = async ({ 
  page = 1, 
  take = 12,
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const session = await auth();
    if (!session || session.user.rol !== 'admin') {
      throw new Error('No se pudo obtener la sesión o no tienes permisos');
    }

    // 1. Obtener los companyId asociados al usuario
    const employeeCompanies = await prisma.employeeCompany.findMany({
      where: {
        employeeId: session.user.id, // Suponiendo que `session.user.id` es el ID del empleado
      },
      select: {
        companyId: true,
      },
    });

    const companyIds = employeeCompanies.map((ec) => ec.companyId);

    if (companyIds.length === 0) {
      return {
        currentPage: page,
        totalPages: 0,
        invoices: [],
      };
    }

    // 2. Obtener las facturas asociadas a esos companyId
    const invoices = await prisma.invoice.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        companyId: {
          in: companyIds,
        },
      },
      include: {
        Company: {
          select: {
            nombre: true,
          },
        },
        Employee: {
          select: {
            nombreCompleto: true,
          }
        }
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
      invoices: invoices.map((invoice) => ({
        ...invoice,
        company: invoice.Company.nombre,
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo cargar las facturas');
  }
};
