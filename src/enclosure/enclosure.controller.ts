import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnclosureService } from './enclosure.service';

@Controller('enclosure')
export class EnclosureController {
  constructor(private readonly enclosureService: EnclosureService) {}

  @Post()
  create(@Body() body: unknown): Promise<unknown> {
    return this.enclosureService.create(body);
  }

  @Get()
  findAll(): Promise<unknown> {
    return this.enclosureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<unknown> {
    return this.enclosureService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown): Promise<unknown> {
    return this.enclosureService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<unknown> {
    return this.enclosureService.remove(id);

  }
}
