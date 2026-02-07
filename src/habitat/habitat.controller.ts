import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitatService } from './habitat.service';

@Controller('habitat')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  @Post()
  create(@Body() body: unknown): Promise<unknown> {
    return this.habitatService.create(body);
  }

  @Get()
  findAll(): Promise<unknown> {
    return this.habitatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<unknown> {
    return this.habitatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown): Promise<unknown> {
    return this.habitatService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<unknown> {
    return this.habitatService.remove(id);
  }
}
