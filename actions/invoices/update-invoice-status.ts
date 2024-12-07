'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Estado } from "@prisma/client";


export const updateInvoiceStatus = async (invoiceId: string, newStatus: Estado) => {

  try {
    const session = await auth();
    if (!session || session.user.rol !== 'admin') {
      throw new Error('No se pudo obtener la sesión o no tienes permisos');
    }

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (!invoice) {
      throw new Error('No se encontró la factura');
    }

    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        estado: newStatus,
      },
    });

    return {
      message: 'Factura actualizada correctamente',
      ok: true
    };
  } catch (error) {
    throw new Error('No se pudo actualizar la factura');
  }
}