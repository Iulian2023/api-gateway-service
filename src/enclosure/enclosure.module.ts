import { Module } from '@nestjs/common';
import { EnclosureService } from './enclosure.service';
import { EnclosureController } from './enclosure.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HABITAT_MANAGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
          queue: 'habitat_manager_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [EnclosureController],
  providers: [EnclosureService],
})
export class EnclosureModule {}
