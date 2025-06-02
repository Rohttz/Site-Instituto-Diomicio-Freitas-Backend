import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';
import { Partner } from './entities/partner.entity';
import { S3Service } from '../common/services/s3.service';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createPartnerDto: CreatePartnerDto, logo: Express.Multer.File): Promise<Partner> {
    const logoUrl = await this.s3Service.uploadFile(logo, 'partners');
    
    const partner = this.partnerRepository.create({
      ...createPartnerDto,
      logo: logoUrl,
    });

    return this.partnerRepository.save(partner);
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto, logo?: Express.Multer.File): Promise<Partner> {
    const partner = await this.findOne(id);
    
    let logoUrl = partner.logo;
    if (logo) {
      // Delete old logo
      await this.s3Service.deleteFile(partner.logo);
      // Upload new logo
      logoUrl = await this.s3Service.uploadFile(logo, 'partners');
    }

    Object.assign(partner, updatePartnerDto, { logo: logoUrl });
    return this.partnerRepository.save(partner);
  }

  async remove(id: string): Promise<void> {
    const partner = await this.findOne(id);
    await this.s3Service.deleteFile(partner.logo);
    await this.partnerRepository.remove(partner);
  }
} 