import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

var cafes = {
  cafes: [
    {
      nome: "Paraíso",
      tipo: "Forte",
      quantidade: 2,
      preco: 25.6,
      id: "22",
      descricao: "Café encorpado com notas intensas de cacau e aroma marcante.",
      tags: ["intenso", "cacau", "tradicional"]
    },
    {
      nome: "Harmonia",
      tipo: "Suave",
      quantidade: 1,
      preco: 18.9,
      id: "35",
      descricao: "Café delicado com acidez equilibrada e toques florais.",
      tags: ["leve", "floral", "adocicado"]
    },
    {
      nome: "Despertar",
      tipo: "Extra Forte",
      quantidade: 3,
      preco: 32.15,
      id: "10",
      descricao: "Blend robusto com alta concentração de cafeína e sabor persistente.",
      tags: ["forte", "encorpado", "amargo"]
    },
    {
      nome: "Tropical",
      tipo: "Aromatizado",
      quantidade: 1,
      preco: 28.5,
      id: "48",
      descricao: "Café com aroma exótico de frutas tropicais e notas cítricas.",
      tags: ["frutado", "cítrico", "aromatizado"]
    },
    {
      nome: "Equilíbrio",
      tipo: "Médio",
      quantidade: 2,
      preco: 22.75,
      id: "52",
      descricao: "Café balanceado com corpo presente e notas suaves de caramelo.",
      tags: ["equilibrado", "caramelo", "clássico"]
    }
  ]
};

@Injectable()
export class CoffeeService {
  getCoffeById(id: string): any {
    const coffe = cafes.cafes.find((coffe) => coffe.id === id);
    if (!coffe) {
      return { message: 'Café não encontrado' };
    }
    return coffe;
  }

  getHello(): string {
    return 'Hello World!';
  }

  getCoffes(): any {
    return cafes;
  }

  updateCoffe(id: string, coffeData: any): any {
    const coffeIndex = cafes.cafes.findIndex((coffe) => coffe.id === id);
    if (coffeIndex === -1) {
      return { message: 'Café não encontrado' };
    }
    cafes.cafes[coffeIndex] = { ...cafes.cafes[coffeIndex], ...coffeData };
    return cafes.cafes[coffeIndex];
  }

  deleteCoffe(id: string): any {
    const coffeIndex = cafes.cafes.findIndex((coffe) => coffe.id === id);
    if (coffeIndex === -1) {
      return { message: 'Café não encontrado' };
    }
    cafes.cafes.splice(coffeIndex, 1);
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
    const idExists = cafes.cafes.some(coffe => coffe.id === id);
    if (idExists) {
      throw new HttpException(
        { message: 'Dados inválidos ou ID já existente.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Adiciona o novo café completo, mantendo todas as propriedades
    cafes.cafes.push(coffeData);

    // Retorna o novo café com status 201 Created
    return {
      statusCode: HttpStatus.CREATED,
      data: coffeData,
    };
  }
}
