import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PartnersService } from './partners.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @Body() createPartnerDto: CreatePartnerDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.partnersService.create(createPartnerDto, logo);
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.partnersService.update(id, updatePartnerDto, logo);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.partnersService.remove(id);
  }
} 