import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [SpecieModule, AnimalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
