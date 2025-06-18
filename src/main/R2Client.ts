import { S3Client } from '@aws-sdk/client-s3'
import 'dotenv/config'

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
})
