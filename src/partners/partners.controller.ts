import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Partner[]; total: number; page: number; limit: number }> {
    return this.partnersService.findAllPaginated(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Partner|null> {
    return this.partnersService.findOne(id);
  }

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto): Promise<Partner> {
    return this.partnersService.create(createPartnerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ): Promise<Partner|null> {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.partnersService.remove(id);
  }
} 