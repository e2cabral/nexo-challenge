import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ClientRepository from '../../data/repositories/client.repository';

@Injectable()
export default class ClientService {
  clientRepository: ClientRepository;

  constructor(
    @InjectRepository(ClientRepository) clientRepository: ClientRepository,
  ) {
    this.clientRepository = clientRepository;
  }
  async checkClientOrderedExists(id: string): Promise<boolean> {
    const client = await this.clientRepository.getById(id);
    return !!client;
  }
}
