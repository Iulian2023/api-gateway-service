import { Module } from '@nestjs/common';
import { SpecieService } from './specie.service';
import { SpecieController } from './specie.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANIMAL_REGISTRY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'animal-registry-service',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [SpecieController],
  providers: [SpecieService],
})
export class SpecieModule {}
