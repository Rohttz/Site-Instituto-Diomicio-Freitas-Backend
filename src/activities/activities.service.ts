import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { S3Service } from '../common/services/s3.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createActivityDto: CreateActivityDto, image: Express.Multer.File): Promise<Activity> {
    const imageUrl = await this.s3Service.uploadFile(image, 'activities');
    
    const activity = this.activityRepository.create({
      ...createActivityDto,
      image: imageUrl,
    });

    return this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto, image?: Express.Multer.File): Promise<Activity> {
    const activity = await this.findOne(id);
    
    let imageUrl = activity.image;
    if (image) {
      // Delete old image
      await this.s3Service.deleteFile(activity.image);
      // Upload new image
      imageUrl = await this.s3Service.uploadFile(image, 'activities');
    }

    Object.assign(activity, updateActivityDto, { image: imageUrl });
    return this.activityRepository.save(activity);
  }

  async remove(id: string): Promise<void> {
    const activity = await this.findOne(id);
    await this.s3Service.deleteFile(activity.image);
    await this.activityRepository.remove(activity);
  }
}