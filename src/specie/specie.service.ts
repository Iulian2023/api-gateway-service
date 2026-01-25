import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { callClient } from '../utils/rpc-utils';

@Injectable()
export class SpecieService {
  constructor(@Inject('ANIMAL_REGISTRY_SERVICE') private readonly animalClient: ClientProxy) { }

  create(payload: any) {
    return callClient(this.animalClient, 'createSpecie', payload);
  }

  findAll() {
    return callClient(this.animalClient, 'findAllSpecie', {});
  }

  findOne(id: string) {
    return callClient(this.animalClient, 'findOneSpecie', id);
  }

  update(id: string, payload: any) {
    return callClient(this.animalClient, 'updateSpecie', { id, ...payload });
  }

  remove(id: string) {
    return callClient(this.animalClient, 'removeSpecie', id);
  }
}
