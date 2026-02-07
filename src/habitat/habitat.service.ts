import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { callClient } from 'src/utils/rpc-utils';

@Injectable()
export class HabitatService {
  constructor(
    @Inject('HABITAT_MANAGER_SERVICE')
    private readonly habitatClient: ClientProxy,
  ) {}

  create(payload: unknown): Promise<unknown> {
    return callClient(this.habitatClient, 'createHabitat', payload);
  }

  findAll(): Promise<unknown> {
    return callClient(this.habitatClient, 'findAllHabitat', {});
  }

  findOne(id: string): Promise<unknown> {
    return callClient(this.habitatClient, 'findOneHabitat', id);
  }

  update(id: string, payload: unknown): Promise<unknown> {
    const data =
      typeof payload === 'object' && payload !== null
        ? ({ id, ...(payload as Record<string, unknown>) } as unknown)
        : ({ id } as unknown);

    return callClient(this.habitatClient, 'updateHabitat', data);
  }

  remove(id: string): Promise<unknown> {
    return callClient(this.habitatClient, 'removeHabitat', id);
  }
}
