'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


interface PaginationOptions {
  page?: number;
  take?: number;
  name?: string;
  activo?: boolean;
}

export const getPaginatedCompany = async ({ 
  page = 1, 
  take = 12,
  name,
  activo
}: PaginationOptions) => {

  if( isNaN( Number(page)) ) page = 1;
  if( page < 1 ) page = 1;

  try {

    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');

    if(session.user.rol !== 'administrator') {
      return {
        message: 'No tienes permisos para ver las compañias',
        code: '401',
        ok: false
      }
    }

    //1. Get companies
    const companies = await prisma.company.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        nombre: {
          contains: name,
          mode: 'insensitive'
        },
        activo: activo
      },
      orderBy: {
        nombre: 'asc'
      }
    });

    //2. get total pages
    const totalCount = await prisma.company.count({
      where: {
        nombre: {
          contains: name,
          mode: 'insensitive'
        },
        activo: activo
      }
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: 1,
      totalPages: totalPages,
      companies: companies
    }
  } catch (error) {
    throw new Error('No se pudo cargar las compañias');;
  }
}
