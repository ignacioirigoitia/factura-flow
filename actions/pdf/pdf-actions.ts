'use server'

import { processPDF } from "./process-pdf";

export const createPdf = async (formData: FormData): Promise<string> => {
  try {
    const response = await processPDF(formData);
    return response.message; 
  } catch (error) {
    console.error('Error al crear el PDF:', error);
    throw new Error('Error al enviar el archivo');
  }
};
