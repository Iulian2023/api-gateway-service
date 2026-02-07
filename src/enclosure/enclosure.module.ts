import { Module } from '@nestjs/common';
import { EnclosureService } from './enclosure.service';
import { EnclosureController } from './enclosure.controller';
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
  controllers: [EnclosureController],
  providers: [EnclosureService],
})
export class EnclosureModule {}
