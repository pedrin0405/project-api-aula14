import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateCoffeDto } from './create-coffe.dto';

var coffeeDto = {
  cafes: [
    {
      nome: "Paraíso",
      tipo: "Forte",
      quantidade: 2,
      preco: 25.6,
      id: "22",
      descricao: "Café encorpado com notas intensas de cacau e aroma marcante.",
      tags: ["intenso", "cacau", "tradicional"],
      data_create: "2025-05-30T10:00:00.520Z"
    },
    {
      nome: "Harmonia",
      tipo: "Suave",
      quantidade: 1,
      preco: 18.9,
      id: "35",
      descricao: "Café delicado com acidez equilibrada e toques florais.",
      tags: ["leve", "floral", "adocicado"],
      data_create: "2025-05-10T10:00:00.520Z"
    },
    {
      nome: "Despertar",
      tipo: "Extra Forte",
      quantidade: 3,
      preco: 32.15,
      id: "10",
      descricao: "Blend robusto com alta concentração de cafeína e sabor persistente.",
      tags: ["forte", "encorpado", "amargo"],
      data_create: "2025-05-20T10:00:00.520Z"
    },
    {
      nome: "Tropical",
      tipo: "Aromatizado",
      quantidade: 1,
      preco: 28.5,
      id: "48",
      descricao: "Café com aroma exótico de frutas tropicais e notas cítricas.",
      tags: ["frutado", "cítrico", "aromatizado"],
      data_create: "2025-02-03T10:00:00.520Z"
    },
    {
      nome: "Equilíbrio",
      tipo: "Médio",
      quantidade: 2,
      preco: 22.75,
      id: "52",
      descricao: "Café balanceado com corpo presente e notas suaves de caramelo.",
      tags: ["equilibrado", "caramelo", "clássico"],
      data_create: "2025-04-30T10:00:00.520Z"
    }
  ]
};

@Injectable()
export class CoffeeService {
  getCoffeById(id: string): any {
    const coffe = coffeeDto.cafes.find((coffe) => coffe.id === id);
    if (!coffe) {
      return { message: 'Café não encontrado' };
    }
    return coffe;
  }

  getHello(): string {
    return 'Hello World!';
  }

  getCoffes(): any {
    return coffeeDto;
  }

  updateCoffe(id: string, coffeData: any): any {
    const coffeIndex = coffeeDto.cafes.findIndex((coffe) => coffe.id === id);
    if (coffeIndex === -1) {
      return { message: 'Café não encontrado' };
    }
    coffeeDto.cafes[coffeIndex] = { ...coffeeDto.cafes[coffeIndex], ...coffeData };
    return coffeeDto.cafes[coffeIndex];
  }

  deleteCoffe(id: string): any {
    const coffeIndex = coffeeDto.cafes.findIndex((coffe) => coffe.id === id);
    if (coffeIndex === -1) {
      return { message: 'Café não encontrado' };
    }
    coffeeDto.cafes.splice(coffeIndex, 1);
    return { message: 'Café deletado com sucesso' };
  }

  createCoffe(coffeData: any): any {
    const { id, nome, tipo } = coffeData;

    // Validação dos campos obrigatórios
    if (!id || !nome || !tipo) {
      throw new HttpException(
        { message: 'Dados inválidos ou ID já existente.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verifica se o ID já existe
    const idExists = coffeeDto.cafes.some(coffe => coffe.id === id);
    if (idExists) {
      throw new HttpException(
        { message: 'Dados inválidos ou ID já existente.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Adiciona o novo café completo, mantendo todas as propriedades
    coffeeDto.cafes.push(coffeData);

    // Retorna o novo café com status 201 Created
    return {
      statusCode: HttpStatus.CREATED,
      data: coffeData,
    };
  }

  filterCoffesByDate(coffee: CreateCoffeDto): any {
    const startDate = new Date(coffee.start_date);
    const endDate = new Date(coffee.end_date);
    if (startDate && endDate) {
      
      if (startDate > endDate) {
        return new BadRequestException({ cause: 'A data de início não pode ser maior que a data de fim.', description: 'Não é possível filtrar os cafés.' });
      }
      
    const filteredCoffes = coffeeDto.cafes.filter(coffe => {
      const coffeeDate = new Date(coffe.data_create);
      return coffeeDate >= startDate && coffeeDate <= endDate;
    });
    
    return filteredCoffes;
    }

  }
}
