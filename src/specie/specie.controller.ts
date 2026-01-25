import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecieService } from './specie.service';

@Controller('specie')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Post()
  async create(@Body() body: any) {
    return await this.specieService.create(body);
  }

  @Get()
  async findAll() {
    return await this.specieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.specieService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.specieService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.specieService.remove(id);
  }
}