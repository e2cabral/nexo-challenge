import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export default class Client {
  @PrimaryGeneratedColumn()
  clientId: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;
}
