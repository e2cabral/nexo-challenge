import { Inject, Injectable } from '@nestjs/common';
import Order from '../models/order.model';
import OrderRepository from '../../data/repositories/order.repository';
import ProductRepository from '../../data/repositories/product.repository';
import ClientRepository from '../../data/repositories/client.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class OrderService {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
  clientRepository: ClientRepository;

  constructor(
    @InjectRepository(OrderRepository) orderRepository: OrderRepository,
    @InjectRepository(ProductRepository) productRepository: ProductRepository,
    @InjectRepository(ClientRepository) clientRepository: ClientRepository,
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.clientRepository = clientRepository;
  }

  async create(
    body: Order,
    id: string,
  ): Promise<{ messages: Array<string>; order: Order }> {
    try {
      if (!body.products.length)
        throw new Error('Your order must have at least one product');

      if (!(await this.checkClientOrderedExists(id)))
        throw new Error("The user who had created the order doesn't exist");

      const messages = await this.checkProductsAvailability(body);
      const newOrder = await this.orderRepository.createOrder(body);

      if (messages.length) throw new Error(messages.join(', '));

      return {
        messages,
        order: newOrder,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkClientOrderedExists(id: string): Promise<boolean> {
    const client = await this.clientRepository.getById(id);
    return !!client;
  }

  async checkProductsAvailability(order: Order): Promise<Array<string>> {
    const productsNotAvailable = [];
    const ids = order.products.map((p) => p.productId);

    const products = await this.productRepository.getProductsByItsIds(ids);

    order.products.forEach((p) => {
      products.forEach((prod) => {
        if (p.productId === prod.productId) {
          if (p.currentQuantity < prod.currentQuantity)
            throw new Error(`There's not ${prod.productId} enough`);
        }

        productsNotAvailable.push(
          `The ${prod.productId} is not available or doesn't exist.\n`,
        );
      });
    });

    return productsNotAvailable;
  }
}
