import { ApiHideProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Destination } from 'src/destinations/entities/destination.entity';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { User } from 'src/users/entities/user.entity';

export class CreateTripDto {
  @IsString()
  title: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @ApiHideProperty()
  @IsObject()
  user: User;

  @Transform(
    ({ value }: { value: number[] }) =>
      value &&
      value.map((destination) =>
        typeof destination === 'number'
          ? ({ id: destination } as Destination)
          : (destination as Destination),
      ),
  )
  @IsArray()
  @IsOptional()
  destinations?: number[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseDto)
  expenses?: CreateExpenseDto[];
}
