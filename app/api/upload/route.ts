import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  
}