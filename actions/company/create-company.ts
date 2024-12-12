'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface ICreateCompany {
  name: string;
  activo: boolean;
}

export const createCompany = async (company: ICreateCompany) => {

  try {

    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');

    if(session.user.rol !== 'administrator') {
      return {
        message: 'No tienes permisos para crear una compañia',
        code: '401',
        ok: false
      }
    }

    // Crear la compañia en la base de datos usando Prisma
    const companyDb = await prisma.company.create({
      data: {
        nombre: company.name,
        activo: company.activo
      },
    });

    // TODO: Crear un usuario para la compañia que sea el administrador
    return {
      message: 'Compañia creada con exito',
      code: '200',
      ok: true,
      company: companyDb
    }

  } catch (error) {
    console.error('Error creando la compañia:', error);
    return { 
      message: 'Error al crear la compañia', 
      code: '400', 
      ok: false 
    };
  }

}