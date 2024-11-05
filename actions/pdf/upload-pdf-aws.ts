'use server';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
});

async function uploadFileToS3(file : Buffer, fileName: string) {

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: "application/pdf",
  };

  const command = new PutObjectCommand(params);
  try {
    await s3Client.send(command);
    return fileName;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { ok: false, message: "Por favor selecciona un archivo" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);

    return { ok: true, message: "El archivo fue guardado correctamente" };
  } catch (error) {
    console.log({error})
    return { ok: false, message: "Ocurrio un error al subir el archivo" };
  }
}