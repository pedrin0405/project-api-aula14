import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
