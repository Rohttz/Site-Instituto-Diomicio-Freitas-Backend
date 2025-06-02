import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create(createActivityDto);
    return this.activitiesRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find();
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activitiesRepository.findOneBy({ id });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    // 1. Verifica se a atividade existe
    const existing = await this.activitiesRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
  
    // 2. Atualiza a entidade (abordagem mais segura)
    const updated = await this.activitiesRepository.save({
      ...existing,
      ...updateActivityDto
    });
  
    // 3. Retorna a entidade atualizada
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}