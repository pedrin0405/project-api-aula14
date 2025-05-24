import { Module } from '@nestjs/common';
import { CoffeeModule } from './modules/coffes/coffee.module';

@Module({
  imports: [CoffeeModule]
})
export class AppModule {}
