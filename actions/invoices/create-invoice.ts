"use server";

import prisma from '@/lib/prisma';
import { Estado, Prisma } from '@prisma/client';

import * as Yup from 'yup';

const estadosValidos = Object.values(Estado);

// Esquema de validación con Yup
const invoiceSchema = Yup.object().shape({
  monto: Yup.number().required(),
  CAE: Yup.string().required(),
  fechaDeFactura: Yup.date().required(),
  numeroDeFactura: Yup.string().required(),
  periodo: Yup.string().required(),
  notas: Yup.string().optional(),
  estado: Yup.mixed().oneOf(estadosValidos, 'Estado no válido'),
});

interface CreateInvoiceBody {
  monto: number;
  CAE: string;
  fechaDeFactura: Date;
  numeroDeFactura: string;
  periodo: string;
  notas?: string;
  estado?: Estado;
}

export async function createInvoice( invoice: CreateInvoiceBody ) {

  try {
    // Validar el cuerpo de la solicitud según el esquema definido
    const data = await invoiceSchema.validate(invoice);

    // Crear la factura en la base de datos usando Prisma
    await prisma.invoice.create({
      data: {
        ...data,
        notas: data.notas || null,
        estado: data.estado as Estado || 'PENDIENTE',
        // TODO: Reemplazar con el ID del usuario autenticado
        employeeId: '123',
      },
    });

    return { message: 'Factura creada con exito', code: '200', ok: true, };;
  } catch (error) {
    // Verificar si el error es un error conocido de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Puedes manejar errores específicos según su código
      if (error.code === 'P2002') {
        return { message: 'Registro duplicado: El número de factura o CAE ya existe.', code: error.code, ok: false };
      }
    } 

    // En caso de que el error sea desconocido, lo mostramos en consola
    console.error('Error inesperado:', error);

    return { message: 'Ocurrió un error inesperado', code: '400', ok: false };
  }
}
