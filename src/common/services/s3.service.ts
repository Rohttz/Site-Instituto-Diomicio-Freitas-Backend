import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, folder: string = ''): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}${folder ? '/' : ''}${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await this.s3Client.send(command);
    return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const fileName = fileUrl.split('/').pop();
    if (!fileName) return;

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    await this.s3Client.send(command);
  }
} 