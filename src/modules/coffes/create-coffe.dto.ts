// create-coffe.dto.ts
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateCoffeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsOptional()
  quantidade?: number;

  @IsOptional()
  preco?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
