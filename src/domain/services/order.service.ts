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

  async create(order: Order, id: string): Promise<Order> {
    try {
      if (!order.products.length)
        throw new Error('Your order must have at least one product');

      if (!(await this.checkClientOrderedExists(id)))
        throw new Error("The user who had created the order doesn't exist");

      await this.checkProductsAvailability(order);

      return this.orderRepository.createOrder(order);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkClientOrderedExists(id: string): Promise<boolean> {
    const client = await this.clientRepository.getById(id);
    return !!client;
  }

  async checkProductsAvailability(order: Order) {
    const ids = order.products.map((p) => p.productId);

    const products = await this.productRepository.getProductsByItsIds(ids);

    order.products.forEach((p) => {
      products.forEach((prod) => {
        if (p.productId === prod.productId) {
          if (p.currentQuantity < prod.currentQuantity)
            throw new Error(`There's not ${prod.productId} enough`);
        }
      });
    });
  }
}
