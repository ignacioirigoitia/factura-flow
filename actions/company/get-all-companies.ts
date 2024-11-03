'use server'

import prisma from "@/lib/prisma";


export const getAllCompanies = async () => {
  try {
    const companies = await prisma.company.findMany();
    return {
      ok: true,
      companies
    }
  } catch (error) {
    throw new Error('No se pudo cargar las compañias');;
  }
}