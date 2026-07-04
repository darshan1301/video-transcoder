import {
  CopyObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("❌ Missing AWS_ACCESS_KEY_ID");
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("❌ Missing AWS_SECRET_ACCESS_KEY");
}
if (!process.env.AWS_REGION) {
  throw new Error("❌ Missing AWS_REGION");
}
if (!process.env.AWS_S3_BUCKET) {
  throw new Error("❌ Missing AWS_S3_BUCKET");
}

export const s3client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getUploadUrl(key: string, expiresIn: number = 3600) {

    const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

    const url: string = await getSignedUrl(s3client, putCommand, { expiresIn });
    return url;
}