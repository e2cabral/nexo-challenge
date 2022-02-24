import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionModule } from './infra/database/database.connection';
import { ProductController } from './presentation/controllers/product.controller';
import { ClientController } from './presentation/controllers/client.controller';
import { OrderController } from './presentation/controllers/order.controller';
import OrderService from './domain/services/order.service';
import OrderRepository from './data/repositories/order.repository';
import ClientRepository from './data/repositories/client.repository';
import ProductRepository from './data/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DatabaseConnectionModule(),
    TypeOrmModule.forFeature([
      OrderRepository,
      ProductRepository,
      ClientRepository,
    ]),
  ],
  controllers: [
    AppController,
    ProductController,
    ClientController,
    OrderController,
  ],
  providers: [
    AppService,
    OrderService,
    // {
    //   provide: 'OrderRepository',
    //   useValue: OrderRepository,
    // },
    // {
    //   provide: 'ProductRepository',
    //   useValue: ProductRepository,
    // },
    // {
    //   provide: 'ClientRepository',
    //   useValue: ClientRepository,
    // },
  ],
})
export class AppModule {}
