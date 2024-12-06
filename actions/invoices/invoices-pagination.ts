'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedInvoices = async ({ 
  page = 1, 
  take = 12,
}: PaginationOptions) => {

  if( isNaN( Number(page)) ) page = 1;
  if( page < 1 ) page = 1;

  try {


    const session = await auth();
    if (!session) {
      throw new Error('No se pudo obtener la sesión');
    }

    //1. Get invoices
    const invoices = await prisma.invoice.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        employeeId: session.user.id
      }
    });

    //2. get total pages
    const totalCount = await prisma.invoice.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: 1,
      totalPages: totalPages,
      invoices: invoices
    }
  } catch (error) {
    throw new Error('No se pudo cargar las facturas');;
  }
}