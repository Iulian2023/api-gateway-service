import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { callClient } from 'src/utils/rpc-utils';

@Injectable()
export class EnclosureService {
  constructor(
    @Inject('HABITAT_MANAGER_SERVICE')
    private readonly enclosureClient: ClientProxy,
  ) {}

  create(payload: unknown): Promise<unknown> {
    return callClient(this.enclosureClient, 'createEnclosure', payload);
  }

  findAll(): Promise<unknown> {
    return callClient(this.enclosureClient, 'findAllEnclosure', {});
  }

  findOne(id: string): Promise<unknown> {
    return callClient(this.enclosureClient, 'findOneEnclosure', id);
  }

  update(id: string, payload: unknown): Promise<unknown> {
    const data =
      typeof payload === 'object' && payload !== null
        ? ({ id, ...(payload as Record<string, unknown>) } as unknown)
        : ({ id } as unknown);

    return callClient(this.enclosureClient, 'updateEnclosure', data);
  }

  remove(id: string): Promise<unknown> {
    return callClient(this.enclosureClient, 'removeEnclosure', id);
  }
}
