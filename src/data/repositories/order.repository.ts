import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import Order from '../../domain/models/order.model';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  async getAll(): Promise<Array<Order>> {
    try {
      return this.find();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getById(id: string): Promise<Order> {
    try {
      return this.findOne({ orderId: +id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createOrder(product: Order): Promise<Order> {
    try {
      return this.save(product);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await this.delete({ orderId: +id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateOrder(id: string, product: Order): Promise<UpdateResult> {
    try {
      return this.update({ orderId: +id }, product);
    } catch (err) {
      throw new Error(err);
    }
  }
}
