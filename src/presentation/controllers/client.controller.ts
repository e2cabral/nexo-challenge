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
import Client from '../../domain/models/client.model';

@Controller('clients')
export class ClientController {
  @Get('')
  @HttpCode(200)
  getAll(): Array<Client> {
    return [];
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string): Client {
    return {} as Client;
  }

  @Post()
  @HttpCode(200)
  create(): Client {
    return {} as Client;
  }

  @Delete()
  @HttpCode(204)
  delete(): void {}

  @Patch(':id')
  @HttpCode(204)
  update(@Body() body: any): Client {
    return {} as Client;
  }
}
