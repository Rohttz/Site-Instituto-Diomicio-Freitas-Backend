import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  title: string;
} 