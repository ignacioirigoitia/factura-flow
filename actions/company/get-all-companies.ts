'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const getAllCompanies = async () => {
  try {
    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');
    if(session.user.rol !== 'administrator'){
      throw new Error('No tienes permisos para realizar esta acción');
    }
    const companies = await prisma.company.findMany();
    return {
      ok: true,
      companies
    }
  } catch (error) {
    throw new Error('No se pudo cargar las compañias');;
  }
}