import { IsString, IsBoolean, IsOptional, IsUrl, Length } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;
}

export class UpdatePartnerDto {
  @IsString()
  @Length(3, 100)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;
} 