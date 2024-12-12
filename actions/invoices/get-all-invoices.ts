'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getAllInvoicesPaginated = async ({ 
  page = 1, 
  take = 12,
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');
    if(session.user.rol !== 'administrator'){
      throw new Error('No tienes permisos para realizar esta acción');
    }
    const invoices = await prisma.invoice.findMany({
      take: take,
      skip: (page - 1) * take,
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

    const totalCount = await prisma.invoice.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      currentPage: page,
      totalPages: totalPages,
      invoices: invoices.map((invoice) => ({
        ...invoice,
        company: invoice.Company.nombre,
      })),
    }
  } catch (error) {
    throw new Error('No se pudo cargar las facturas');;
  }
}