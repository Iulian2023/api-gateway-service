import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() body: unknown): Promise<unknown> {
    return this.animalService.create(body);
  }

  @Get()
  findAll(): Promise<unknown> {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<unknown> {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown): Promise<unknown> {
    return this.animalService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<unknown> {
    return this.animalService.remove(id);
  }
}
