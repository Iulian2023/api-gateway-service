import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
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
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
