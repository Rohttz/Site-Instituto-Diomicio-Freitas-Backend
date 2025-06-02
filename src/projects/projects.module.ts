import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { S3Service } from '../common/services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]), // Registra a entidade Activity para injeção no service
    ConfigModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, S3Service],
  exports: [ProjectsService], // Opcional: se outros módulos precisarem usar ProjectsService
})
export class ProjectsModule {}