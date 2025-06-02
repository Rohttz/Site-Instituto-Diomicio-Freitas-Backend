import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Partner } from './entities/partner.entity';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { S3Service } from '../common/services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner]),
    ConfigModule,
  ],
  providers: [PartnersService, S3Service],
  controllers: [PartnersController],
  exports: [PartnersService],
})
export class PartnersModule {} 