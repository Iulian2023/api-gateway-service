import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { callClient } from 'src/utils/rpc-utils';

@Injectable()
export class AnimalService {
  constructor(
    @Inject('ANIMAL_REGISTRY_SERVICE')
    private readonly animalClient: ClientProxy,
  ) {}

  create(payload: unknown): Promise<unknown> {
    return callClient(this.animalClient, 'createAnimal', payload);
  }

  findAll(): Promise<unknown> {
    return callClient(this.animalClient, 'findAllAnimal', {});
  }

  findOne(id: string): Promise<unknown> {
    return callClient(this.animalClient, 'findOneAnimal', id);
  }

  update(id: string, payload: unknown): Promise<unknown> {
    const data =
      typeof payload === 'object' && payload !== null
        ? ({ id, ...(payload as Record<string, unknown>) } as unknown)
        : ({ id } as unknown);

    return callClient(this.animalClient, 'updateAnimal', data);
  }

  remove(id: string): Promise<unknown> {
    return callClient(this.animalClient, 'removeAnimal', id);
  }
}
