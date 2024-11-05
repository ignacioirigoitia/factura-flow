'use server'

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type ResponseData = {
 url?: string,
 ok: boolean,
 message: string,
}

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
});

export const getPdfAws = async (fileName: string): Promise<ResponseData> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
      Key: fileName,
    });
    const url = await getSignedUrl(s3Client, command);

    return { url, ok: true, message: 'Image fetched successfully' };
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return { ok: false, message: 'Error fetching image from S3' };
  }
}