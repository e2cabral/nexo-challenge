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
import Product from '../../domain/protocols/i-product.model';

@Controller('products')
export class ProductController {
  @Get('')
  @HttpCode(200)
  getAll(): Array<Product> {
    return [];
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string): Product {
    return {} as Product;
  }

  @Post()
  @HttpCode(200)
  create(): Product {
    return {} as Product;
  }

  @Delete()
  @HttpCode(204)
  delete(): void {}

  @Patch(':id')
  @HttpCode(204)
  update(@Body() body: any): Product {
    return {} as Product;
  }
}
