'use server'

import { startOfDay, endOfDay } from 'date-fns'
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  concept?: string;
  date?: string;
}

export const getAllAdminInvoicesPaginated = async ({ 
  page = 1, 
  take = 12,
  concept,
  date
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');
    if(session.user.rol !== 'admin'){
      throw new Error('No tienes permisos para realizar esta acción');
    }

    const selectedDate = date ? new Date(`${date}T00:00:00`) : undefined

    const invoices = await prisma.adminInvoice.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        companyId: {
          in: session.user.companies.map(company => company.companyId),
        },
        concepto: {
          contains: concept,
          mode: 'insensitive',
        },
        fecha: {
          gte: selectedDate ? startOfDay(selectedDate) : undefined,
          lte: selectedDate ? endOfDay(selectedDate) : undefined,
        }
      },
      include: {
        Company: { select: { nombre: true } },
        createdBy: { select: { nombreCompleto: true } }
      },
    });

    const totalCount = await prisma.adminInvoice.count({ where: {
      companyId: {
        in: session.user.companies.map(company => company.companyId),
      },
      concepto: {
        contains: concept,
        mode: 'insensitive',
      }
    } });
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      currentPage: page,
      totalPages,
      invoices: invoices.map((invoice) => ({
        ...invoice,
        company: invoice.Company.nombre,
      })),
    };
  } catch (error) {
    console.log('Error al obtener las facturas:', error);
    throw new Error('No se pudo cargar las facturas');
  }
};
