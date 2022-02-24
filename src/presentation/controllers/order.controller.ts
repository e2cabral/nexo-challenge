import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import Order from '../../domain/models/order.model';
import OrderService from '../../domain/services/order.service';
import { ok, serverError } from '../../helpers/http';
import { HttpResponse } from '../../infra/protocols/http';

@Controller('orders')
export class OrderController {
  constructor(public service: OrderService) {}

  @Get('')
  @HttpCode(200)
  getAll(): Array<Order> {
    return [];
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string): Order {
    return {} as Order;
  }

  @Post(':clientId')
  @HttpCode(200)
  async create(
    @Param('clientId') id: string,
    @Body() body: Order,
  ): Promise<HttpResponse> {
    try {
      const order = await this.service.create(body, id);
      return ok(order);
    } catch (err) {
      return serverError(err);
    }
  }

  @Delete()
  @HttpCode(204)
  delete(): void {}

  @Patch(':id')
  @HttpCode(204)
  update(@Body() body: any): Order {
    return {} as Order;
  }
}
