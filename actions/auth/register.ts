'use server'

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerUser = async (
  name: string, 
  email: string, 
  password: string,
  phone: string,
) => {
  try {
    const user = await prisma.employee.create({
      data: {
        nombreCompleto: name,
        correo: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        telefono: phone,
      },
      select: {
        id: true,
        nombreCompleto: true,
        correo: true
      }
    });
    return {
      ok: true,
      message: 'Usuario registrado correctamente',
      user: user
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al registrar el usuario'
    }
  }

}