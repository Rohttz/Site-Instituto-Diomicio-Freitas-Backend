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
      region: 'auto',
      endpoint: `https://${this.configService.get('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.get('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('R2_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
    this.bucketName = this.configService.get('R2_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, folder: string = ''): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}${folder ? '/' : ''}${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);
    
    const customDomain = this.configService.get('R2_CUSTOM_DOMAIN');
    if (customDomain) {
      return `https://${customDomain}/${fileName}`;
    }
    
    return `https://${this.configService.get('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com/${this.bucketName}/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    let fileName: string;
    
    if (fileUrl.includes('.r2.cloudflarestorage.com')) {
      const urlParts = fileUrl.split('/');
      fileName = urlParts.slice(4).join('/');
    } else {
      const urlParts = fileUrl.split('/');
      fileName = urlParts.slice(3).join('/');
    }
    
    if (!fileName) return;

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    await this.s3Client.send(command);
  }
} 