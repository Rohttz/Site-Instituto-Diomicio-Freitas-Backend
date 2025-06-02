import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsString, IsUrl, IsDate, Length, IsArray, IsOptional } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  writer?: string;

  @IsUrl()
  @IsOptional()
  writerPhotoUrl?: string;

  @IsString()
  @IsOptional()
  writerRole?: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  readingTime?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @Length(1, 200)
  @IsOptional()
  summary?: string;

  @IsString()
  @Length(1, 1500)
  @IsOptional()
  text?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}