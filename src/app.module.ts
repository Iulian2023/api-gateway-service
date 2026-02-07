import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';
import { AnimalModule } from './animal/animal.module';
import { HabitatModule } from './habitat/habitat.module';
import { EnclosureModule } from './enclosure/enclosure.module';

@Module({
  imports: [SpecieModule, AnimalModule, HabitatModule, EnclosureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
