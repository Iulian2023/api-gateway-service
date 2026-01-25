import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecieService } from './specie.service';

@Controller('specie')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Post()
  create(@Body() body: unknown): Promise<unknown> {
    return this.specieService.create(body);
  }

  @Get()
  findAll(): Promise<unknown> {
    return this.specieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<unknown> {
    return this.specieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown): Promise<unknown> {
    return this.specieService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<unknown> {
    return this.specieService.remove(id);
  }
}
