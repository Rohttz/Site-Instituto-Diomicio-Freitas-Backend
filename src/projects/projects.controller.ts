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
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto, image);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto, image);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}