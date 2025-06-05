import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get('R2_SECRET_ACCESS_KEY');
    const bucketName = this.configService.get('R2_BUCKET_NAME');
    const endpoint = this.configService.get('R2_ENDPOINT');

    if (!accessKeyId || !secretAccessKey || !bucketName || !endpoint) {
      throw new Error('Configuração R2 incompleta. Verifique as variáveis de ambiente.');
    }

    this.s3Client = new S3Client({
      region: 'auto', // Cloudflare R2 usa 'auto' como região
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      forcePathStyle: true,
    });
    
    this.bucketName = bucketName;
  }

  async uploadFile(file: Express.Multer.File, folder: string = ''): Promise<string> {
    
    if (!file) {
      throw new Error('Nenhum arquivo fornecido para upload');
    }

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}${folder ? '/' : ''}${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        originalName: file.originalname,
        uploadDate: new Date().toISOString(),
      },
    });

    try {
      await this.s3Client.send(command);

      // Gerar URL pública
      const publicUrl = this.generatePublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      throw new Error(`Falha no upload para R2: ${error.message}`);
    }
  }

  private generatePublicUrl(fileName: string): string {
    const customDomain = this.configService.get('R2_PUBLIC_URL');
    if (customDomain) {
      return `${customDomain}/${fileName}`;
    }
    
    const endpoint = this.configService.get('R2_ENDPOINT');
    return `${endpoint}/${this.bucketName}/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl) {
      return;
    }

    let fileName: string;
    
    // Extrair o nome do arquivo da URL
    if (fileUrl.includes('.r2.cloudflarestorage.com')) {
      const urlParts = fileUrl.split('/');
      fileName = urlParts.slice(4).join('/');
    } else {
      const urlParts = fileUrl.split('/');
      fileName = urlParts.slice(3).join('/');
    }
    
    if (!fileName) {
      return;
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      console.error('Erro ao excluir arquivo do R2:', error);
    }
  }
} 