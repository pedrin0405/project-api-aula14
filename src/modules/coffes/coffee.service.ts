import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export class CreateCoffeeDto {
  nome: string;
  tipo: string;
  precoUnitario?: number;
  descricao?: string;
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
}

@Injectable()
export class CoffeeService {
  constructor(private prisma: PrismaService) {}

  async getCoffeeById(id: number): Promise<any> {
    const coffee = await this.prisma.cafe.findUnique({
      where: { id: id },
    });
    if (!coffee) {
      throw new HttpException('Café não encontrado', HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getCoffees(): Promise<any[]> {
    return this.prisma.cafe.findMany();
  }

  async updateCoffee(id: number, coffeeData: Prisma.CafeUpdateInput): Promise<any> {
    try {
      const updatedCoffee = await this.prisma.cafe.update({
        where: { id: id },
        data: coffeeData,
      });
      return updatedCoffee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Café não encontrado', HttpStatus.NOT_FOUND);
        }
      }
      throw error;
    }
  }

  async deleteCoffee(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.cafe.delete({
        where: { id: id },
      });
      return { message: 'Café deletado com sucesso' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Café não encontrado', HttpStatus.NOT_FOUND);
        }
      }
      throw error;
    }
  }

  async createCoffee(coffeeData: Prisma.CafeCreateInput): Promise<any> {
    if (!coffeeData.nome || !coffeeData.tipo) {
      throw new BadRequestException('Dados inválidos: nome e tipo são obrigatórios.');
    }

    try {
      const newCoffee = await this.prisma.cafe.create({
        data: {
          ...coffeeData,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: newCoffee,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Nome do café ou outro campo único já existente.', HttpStatus.CONFLICT);
        }
      }
      throw error;
    }
  }

  async filterCoffeesByDate(filterDto: CreateCoffeeDto): Promise<any[]> {
    const startDate = filterDto.startDate;
    const endDate = filterDto.endDate;

    if (!startDate || !endDate) {
      throw new BadRequestException('As datas de início e fim são obrigatórias para filtrar por data.');
    }

    if (startDate > endDate) {
      throw new BadRequestException({ cause: 'A data de início não pode ser maior que a data de fim.', description: 'Não é possível filtrar os cafés.' });
    }

    const filteredCoffees = await this.prisma.cafe.findMany({
      where: {
        data_created: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return filteredCoffees;
  }
}