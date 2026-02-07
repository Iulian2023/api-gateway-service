import { Module } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { HabitatController } from './habitat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HABITAT_MANAGER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'habitat-manager-service',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [HabitatController],
  providers: [HabitatService],
})
export class HabitatModule { }
