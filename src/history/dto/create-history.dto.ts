import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MilestoneDto {
  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  event: string;
}

export class CreateHistoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  foundationYear: string;

  @IsArray()
  @IsString({ each: true })
  content: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDto)
  milestones: MilestoneDto[];
} 