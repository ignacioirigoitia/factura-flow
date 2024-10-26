"use server";

import pdfParse from "pdf-parse/lib/pdf-parse";

export async function processPDF(data: FormData) { 

  const file = data.get("file") as File;

  if (!file) {
    throw new Error("No se recibió un archivo");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await pdfParse(buffer);

  console.log(`Archivo recibido: ${file.name}, tamaño: ${file.size} bytes`);

  return { message: result?.text || "Archivo recibido correctamente" };
}
