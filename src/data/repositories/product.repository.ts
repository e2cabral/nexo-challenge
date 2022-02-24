import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import Product from '../../domain/models/product.model';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  async getAll(): Promise<Array<Product>> {
    try {
      return this.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(id: string): Promise<Product> {
    try {
      return this.findOne({ productId: +id });
    } catch (err) {
      throw new Error(err);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      return this.save(product);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.delete({ productId: +id });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProduct(id: string, product: Product): Promise<UpdateResult> {
    try {
      return this.update({ productId: +id }, product);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProductsByItsIds(ids: Array<number>): Promise<Array<Product>> {
    try {
      return this.findByIds(ids);
    } catch (err) {
      throw new Error(err);
    }
  }
}
