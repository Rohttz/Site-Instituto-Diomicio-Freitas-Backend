// posts.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { S3Service } from '../common/services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    ConfigModule,
  ],
  providers: [PostsService, S3Service],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}