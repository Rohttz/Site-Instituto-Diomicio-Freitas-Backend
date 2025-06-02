import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const history = this.historyRepository.create(createHistoryDto);
    return this.historyRepository.save(history);
  }

  async findAll(): Promise<History[]> {
    return this.historyRepository.find();
  }

  async findOne(id: string): Promise<History> {
    const history = await this.historyRepository.findOne({ where: { id } });
    if (!history) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
    return history;
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    const history = await this.findOne(id);
    Object.assign(history, updateHistoryDto);
    return this.historyRepository.save(history);
  }

  async remove(id: string): Promise<void> {
    const history = await this.findOne(id);
    await this.historyRepository.remove(history);
  }
} 