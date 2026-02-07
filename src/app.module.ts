import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';
import { AnimalModule } from './animal/animal.module';
import { HabitatModule } from './habitat/habitat.module';

@Module({
  imports: [SpecieModule, AnimalModule, HabitatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
