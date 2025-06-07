import { Module } from '@nestjs/common';
import { CoffeeModule } from './modules/coffes/coffee.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CoffeeModule],
  providers: [PrismaService]
})
export class AppModule {}
