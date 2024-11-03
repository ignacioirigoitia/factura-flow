'use server'

import prisma from "@/lib/prisma";

interface IUpdateCompany {
  id: string;
  name: string;
  activo: boolean;
}

export const updateCompany = async (data: IUpdateCompany) => {

  const {id, name, activo} = data;

  try {
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        nombre: name,
        activo: activo
      }
    });
    return {
      message: 'Compañia actualizada con exito',
      code: '200',
      ok: true,
      company: updatedCompany
    }
  } catch (error) {
    console.error('Error actualizando la compañia:', error);
    return { 
      message: 'Error al actualizar la compañia', 
      code: '400',
      ok: false 
    };
  }

}