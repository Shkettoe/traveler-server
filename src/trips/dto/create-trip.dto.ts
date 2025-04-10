import { ApiHideProperty } from '@nestjs/swagger';
import { IsDateString, IsObject, IsString } from 'class-validator';
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
}
