import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query.dto';
import { User } from '../entities/user.entity';
import { IsEnum, IsOptional } from 'class-validator';

enum OrderBy {
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryUsersDto extends IntersectionType(
  QueryDto,
  PartialType(PickType(User, ['email', 'firstName', 'lastName'])),
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
