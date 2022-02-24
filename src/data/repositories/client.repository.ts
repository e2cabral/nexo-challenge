import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import Client from '../../domain/models/client.model';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Client)
export default class ClientRepository extends Repository<Client> {
  async getAll(): Promise<Array<Client>> {
    try {
      return this.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(id: string): Promise<Client> {
    try {
      return this.findOne({ clientId: +id });
    } catch (err) {
      throw new Error(err);
    }
  }

  async createClient(product: Client): Promise<Client> {
    try {
      return this.save(product);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      await this.delete({ clientId: +id });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateClient(id: string, product: Client): Promise<UpdateResult> {
    try {
      return this.update({ clientId: +id }, product);
    } catch (err) {
      throw new Error(err);
    }
  }
}
