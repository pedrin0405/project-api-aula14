// create-coffe.dto.ts
import { IsNotEmpty, IsString, IsArray, IsOptional, isDate } from 'class-validator';

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

  @IsOptional()
  data_create?: Date;

  @IsOptional()
  start_date?: Date;

  @IsOptional()
  end_date?: Date;
}
