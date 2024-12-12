'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getEmployeeCompanies = async () => {
  try {
    
    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');

    const employeeCompanies = await prisma.employeeCompany.findMany({
      where: {
        employeeId: session.user.id,
      },
      include: {
        company: true, // Incluir la información de la compañía asociada
      },
    });

    // Si no hay compañías asociadas al empleado
    if (!employeeCompanies || employeeCompanies.length === 0) {
      throw new Error('El empleado no tiene compañías asociadas');
    }


    // Retornar las compañías
    return {
      companies: employeeCompanies.map((relation) => relation.company)
    }

  } catch (error) {
    console.log({error})
    throw new Error('No se pudo cargar las compañias');
  }
}