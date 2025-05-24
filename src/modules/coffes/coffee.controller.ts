import { Controller, Get, Param } from '@nestjs/common';
import { CoffeeService } from './coffee.service';


@Controller()
export class CoffeeController {
  constructor(private readonly appService: CoffeeService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('coffes')
  getCoffes(): any {
    return this.appService.getCoffes();
  }
  @Get('coffes/:id/detalhes')
  getCoffeById(@Param('id') id: string): any {
    return this.appService.getCoffeById(id);
  }
  
}
