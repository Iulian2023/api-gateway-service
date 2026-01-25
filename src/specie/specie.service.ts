import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { callClient } from '../utils/rpc-utils';

@Injectable()
export class SpecieService {
  constructor(
    @Inject('ANIMAL_REGISTRY_SERVICE')
    private readonly animalClient: ClientProxy,
  ) {}

  create(payload: unknown): Promise<unknown> {
    return callClient(this.animalClient, 'createSpecie', payload);
  }

  findAll(): Promise<unknown> {
    return callClient(this.animalClient, 'findAllSpecie', {});
  }

  findOne(id: string): Promise<unknown> {
    return callClient(this.animalClient, 'findOneSpecie', id);
  }

  update(id: string, payload: unknown): Promise<unknown> {
    const data =
      typeof payload === 'object' && payload !== null
        ? ({ id, ...(payload as Record<string, unknown>) } as unknown)
        : ({ id } as unknown);

    return callClient(this.animalClient, 'updateSpecie', data);
  }

  remove(id: string): Promise<unknown> {
    return callClient(this.animalClient, 'removeSpecie', id);
  }
}
