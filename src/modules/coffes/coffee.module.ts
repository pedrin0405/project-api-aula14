import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CoffeeController],
  providers: [CoffeeService, PrismaService],
  exports: [CoffeeService, PrismaService],
})
export class CoffeeModule {}
