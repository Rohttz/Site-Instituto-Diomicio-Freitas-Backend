import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity } from './entities/activity.entity';
import { S3Service } from '../common/services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]), // Registra a entidade Activity para injeção no service
    ConfigModule,
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, S3Service],
  exports: [ActivitiesService], // Opcional: se outros módulos precisarem usar ActivitiesService
})
export class ActivitiesModule {}