
import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main () {

  // 1. Borrar registros previos
  // await Promise.all([
    await prisma.invoice.deleteMany();
  // ]);

  const { invoices } = initialData;

  // 2. Crear Invoices
  invoices.forEach( async (invoice) => {
    const { ...rest} = invoice;
    await prisma.invoice.create({
      data: { ...rest }
    })
  });

  console.log('seed ejecutado correctamente');
}

(() => {
  if(process.env.NODE_ENV === 'production') return;

  main();
})();