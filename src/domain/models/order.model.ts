import Product from './product.model';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('order')
export default class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  // @Column({ name: 'products' })
  // products: Array<Product>;

  @Column({ name: 'status', type: 'varchar' })
  status: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Array<Product>;
}
