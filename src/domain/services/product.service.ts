import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductRepository from '../../data/repositories/product.repository';
import Order from '../models/order.model';

@Injectable()
export default class ProductService {
  productRepository: ProductRepository;

  constructor(
    @InjectRepository(ProductRepository) productRepository: ProductRepository,
  ) {
    this.productRepository = productRepository;
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
