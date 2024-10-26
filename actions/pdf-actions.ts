import { processPDF } from "./process-pdf";


export const createPdf = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await processPDF(formData);
    return response.message; 
  } catch (error) {
    throw new Error('Error al enviar el archivo');
  }
};
