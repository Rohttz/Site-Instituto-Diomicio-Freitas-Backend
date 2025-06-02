import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  name?: string;
} 