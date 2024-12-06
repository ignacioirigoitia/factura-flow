'use server'

import { processPDF } from "./process-pdf";

export const createPdf = async (formData: FormData): Promise<any> => {
  try {
    const response = await processPDF(formData);
    return response.message; 
  } catch (error) {
    throw new Error('Error al enviar el archivo');
  }
};
