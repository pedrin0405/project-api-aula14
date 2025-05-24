import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeDto } from './create-coffe.dto';

@Controller('coffes')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  // GET /coffes
  @Get()
  getAll(): any {
    return this.coffeeService.getCoffes();
  }

  // GET /coffes/:id
  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.coffeeService.getCoffeById(id);
  }

  // POST /coffe-create
  @Post('coffe-create')
  create(@Body() coffeData: CreateCoffeDto): any {
    return this.coffeeService.createCoffe(coffeData);
  }

  // PUT /coffes/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() coffeData: any): any {
    return this.coffeeService.updateCoffe(id, coffeData);
  }

  // DELETE /coffes/:id
  @Delete(':id')
  delete(@Param('id') id: string): any {
    return this.coffeeService.deleteCoffe(id);
  }
}
