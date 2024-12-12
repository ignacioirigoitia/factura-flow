'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

interface ICreateEmployee {
  nombreCompleto: string;
  correo: string;
  telefono: string;
  companyId: string;
}

export const createEmployee = async (employee: ICreateEmployee) => {
  try {

    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');

    const password = bcryptjs.hashSync(
      employee.nombreCompleto.replace(/\s/g, '') + new Date().getFullYear(), 10
    );
    const { nombreCompleto, correo, telefono, companyId } = employee;
    // Crear el employee en la base de datos usando Prisma
    // La password va a ser por defecto el nombre cortandole los espacios + el año actual
    const employeeDb = await prisma.employee.create({
      data: {
        nombreCompleto: nombreCompleto,
        correo: correo,
        telefono: telefono,
        password: password
      },
    });

    await prisma.employeeCompany.createMany({
      data: {
        employeeId: employeeDb.id,
        companyId: companyId
      }
    });

    return {
      message: 'Empleado creado con exito',
      code: '200',
      ok: true,
      employee: employeeDb
    }
  } catch (error) {
    console.error('Error creando el empleado:', error);
    return { 
      message: 'Error al crear el empleado', 
      code: '400', 
      ok: false 
    };
  }
}