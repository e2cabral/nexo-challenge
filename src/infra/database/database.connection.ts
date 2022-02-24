import { TypeOrmModule } from '@nestjs/typeorm';
import Client from '../../domain/models/client.model';
import Order from '../../domain/models/order.model';
import Product from '../../domain/models/product.model';

export const DatabaseConnectionModule = () =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'host.docker.internal',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [Client, Order, Product],
    synchronize: true,
  });
