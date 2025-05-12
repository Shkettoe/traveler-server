import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(0)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsEnum(Order)
  order?: Order;

  @IsOptional()
  @IsArray()
  @Transform(
    ({ value }) => (Array.isArray(value) ? value : [value]) as string[],
  )
  relations?: string[];
}
