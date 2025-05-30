'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface IUpdateEmployee {
  nombreCompleto: string;
  correo: string;
  telefono: string;
  companiesId: string[];
  activo: boolean;
  id: string;
}

export const updateEmployee = async (employee: IUpdateEmployee) => {
  try {

    const session = await auth();
    if(!session) throw new Error('No hay una sesión activa');

    const { nombreCompleto, correo, telefono, companiesId, activo, id } = employee;

    const employeeDb = await prisma.employee.update({
      where: {
        id: id
      },
      data: {
        nombreCompleto: nombreCompleto,
        telefono: telefono,
        activo: activo,
        correo: correo
      },
    });

    await prisma.employeeCompany.deleteMany({
      where: {
        employeeId: employeeDb.id,
      },
    });
    
    await prisma.employeeCompany.createMany({
      data: companiesId.map((companyId) => ({
        employeeId: employeeDb.id,
        companyId,
      })),
    });

    return {
      message: "Empleado actualizado con éxito",
      code: "200",
      ok: true,
      employee: employeeDb,
    };
  } catch (error) {
    console.error("Error actualizando el empleado:", error);
    return {
      message: "Error al actualizar el empleado",
      code: "400",
      ok: false,
    };
  }
}