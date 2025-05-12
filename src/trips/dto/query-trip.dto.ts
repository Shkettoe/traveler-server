import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query.dto';
import { Trip } from '../entities/trip.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

enum OrderBy {
  TITLE = 'title',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryTripsDto extends IntersectionType(
  QueryDto,
  PartialType(PickType(Trip, ['title', 'startDate', 'endDate'])),
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @IsOptional()
  @Transform(({ value }: { value: number | User }) =>
    value && typeof value !== 'object' ? { id: Number(value) } : value,
  )
  user?: number;
}
