import { IsString, IsBoolean, IsOptional, IsUrl, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsString()
  author: string;
}

export class UpdatePostDto {
  @IsString()
  @Length(3, 100)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsString()
  author: string;
}