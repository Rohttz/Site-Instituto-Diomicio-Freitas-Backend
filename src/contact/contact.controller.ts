import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.remove(id);
  }
} 