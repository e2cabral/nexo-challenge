import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ name: 'isActive', type: 'boolean' })
  isActive: boolean;

  @Column({ name: 'currentQuantity', type: 'int' })
  currentQuantity: number;
}
