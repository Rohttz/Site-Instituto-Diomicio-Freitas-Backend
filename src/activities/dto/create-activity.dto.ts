export class CreateActivityDto {
    imageUrl: string;
    writer: string;
    writerPhotoUrl: string;
    writerRole: string;
    date: Date;
    readingTime: string;
    title: string;
    summary: string;
    text: string;
    tags: string[];
  }