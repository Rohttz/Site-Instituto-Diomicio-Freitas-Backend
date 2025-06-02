import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivitiesService } from './activities.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Activity> {
    return this.activitiesService.create(createActivityDto, image);
  }

  @Get()
  findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Activity> {
    return this.activitiesService.update(id, updateActivityDto, image);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.activitiesService.remove(id);
  }
}