import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateDestinationDto } from './create-destination.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum OrderBy {
  NAME = 'name',
  COUNTRY = 'country',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryDestinationsDto extends IntersectionType(
  PartialType(CreateDestinationDto),
  QueryDto,
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
