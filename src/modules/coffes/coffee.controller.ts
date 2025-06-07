import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './create-coffe.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  getAll() {
    return this.coffeeService.getCoffees();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.getCoffeeById(id);
  }

  @Post('create')
  create(@Body() coffeeData: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(coffeeData);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() coffeeData: any) {
    return this.coffeeService.updateCoffee(id, coffeeData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.deleteCoffee(id);
  }

  @Get('query-by-date') 
  filterByDate(@Query() filterDto: CreateCoffeeDto) {
    return this.coffeeService.filterCoffeesByDate(filterDto);
  }
}