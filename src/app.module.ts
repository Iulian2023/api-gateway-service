import { Module } from '@nestjs/common';
import { SpecieModule } from './specie/specie.module';

@Module({
  imports: [SpecieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
