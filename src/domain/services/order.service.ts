import { Injectable } from '@nestjs/common';
import Order from '../models/order.model';
import OrderRepository from '../../data/repositories/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import ProductService from './product.service';
import ClientService from './client.service';

@Injectable()
export default class OrderService {
  orderRepository: OrderRepository;
  productService: ProductService;
  clientService: ClientService;

  constructor(
    @InjectRepository(OrderRepository) orderRepository: OrderRepository,
    productService: ProductService,
    clientService: ClientService,
  ) {
    this.orderRepository = orderRepository;
    this.productService = productService;
    this.clientService = clientService;
  }

  async create(body: Order, id: string): Promise<Order> {
    try {
      if (!body.products.length)
        throw new Error('Your order must have at least one product');

      if (!(await this.clientService.checkClientOrderedExists(id)))
        throw new Error("The user who had created the order doesn't exist");

      const messages = await this.productService.checkProductsAvailability(
        body,
      );

      if (messages.length) throw new Error(messages.join(', '));

      return await this.orderRepository.createOrder(body);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
