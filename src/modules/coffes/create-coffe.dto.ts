import { IsNotEmpty, IsString, IsArray, IsNumber, IsDate, IsOptional } from 'class-validator';
import { tiposCafe } from '@prisma/client';

export class CreateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  tipo: tiposCafe;

  // Make it required for creation
  @IsNotEmpty() // Add IsNotEmpty if it must have a value
  @IsNumber()
  precoUnitario: number; // No '?'

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  // These are for filtering, not for creating a coffee object
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}