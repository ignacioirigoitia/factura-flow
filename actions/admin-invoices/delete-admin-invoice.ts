import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function deleteAdminInvoice(invoiceId: string) {
  try {
    // validar que el usuario este logueado y sea un usuario
    const session = await auth();
    const user = session?.user;

    if (!user || user.rol !== 'admin') {
      return { message: 'No autorizado', code: '401', ok: false };
    }
    // Eliminar la factura de la base de datos usando Prisma
    await prisma.adminInvoice.delete({
      where: {
        id: invoiceId,
      },
    });
    return { message: 'Factura eliminada con éxito', code: '200', ok: true };
  } catch (error) {
    // Verificar si el error es un error conocido de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Puedes manejar errores específicos según su código
      if (error.code === 'P2025') {
        return { message: 'Factura no encontrada', code: error.code, ok: false };
      }
    } 

    // En caso de que el error sea desconocido, lo mostramos en consola
    console.error('Error inesperado:', error);
    return { message: 'Error al eliminar la factura', code: '500', ok: false };
  }
}