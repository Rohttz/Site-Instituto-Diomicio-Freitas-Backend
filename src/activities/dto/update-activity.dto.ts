import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { IsString, IsUrl, IsDate, Length, IsArray, IsOptional } from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
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
  @Length(1, 100)
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