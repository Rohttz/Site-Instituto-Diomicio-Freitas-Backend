import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  findAll(): Promise<Partner[]> {
    return this.partnersRepository.find();
  }

  async findAllPaginated(page: number, limit: number) {
    const [data, total] = await this.partnersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  findOne(id: number): Promise<Partner|null> {
    return this.partnersRepository.findOne({ 
      where: { id }
    });
  }

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    const partner = this.partnersRepository.create(createPartnerDto);
    return this.partnersRepository.save(partner);
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto): Promise<Partner|null> {
    await this.partnersRepository.update(id, updatePartnerDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.partnersRepository.delete(id);
  }
} 