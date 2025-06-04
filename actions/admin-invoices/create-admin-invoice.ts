"use server";

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import * as Yup from 'yup';

// Esquema de validación con Yup
const invoiceSchema = Yup.object().shape({
  fecha: Yup.date().required(),
  concepto: Yup.string().required(),
  notas: Yup.string().nullable(),
  nombreArchivo: Yup.string().required(),
  companyId: Yup.string().required(),
});

interface CreateInvoiceBody {
  fecha: Date;
  concepto: string;
  notas?: string | null;
  nombreArchivo: string;
  companyId: string;
}

export async function createAdminInvoice( invoice: CreateInvoiceBody ) {

  try {

    // validar que el usuario este logueado y sea un usuario
    const session = await auth();
    const user = session?.user;

    if (!user || user.rol !== 'admin') {
      return { message: 'No autorizado', code: '401', ok: false };
    }

    // Validar el cuerpo de la solicitud según el esquema definido
    const data = await invoiceSchema.validate(invoice);

    // Crear la factura en la base de datos usando Prisma
    await prisma.adminInvoice.create({
      data: {
        ...data,
        createdById: user.id,
      },
    });

    return { message: 'Factura creada con exito', code: '200', ok: true, };;
  } catch (error) {
    // Verificar si el error es un error conocido de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Puedes manejar errores específicos según su código
      if (error.code === 'P2002') {
        return { message: 'Registro duplicado: El número de factura ya existe.', code: error.code, ok: false };
      }
    } 

    // En caso de que el error sea desconocido, lo mostramos en consola
    console.error('Error inesperado:', error);

    return { message: 'Ocurrió un error inesperado', code: '400', ok: false };
  }
}
