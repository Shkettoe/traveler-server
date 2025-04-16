import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTripDto } from './create-trip.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateTripDto extends PartialType(
  OmitType(CreateTripDto, ['user', 'destinations', 'expenses']),
) {
  @IsArray()
  @IsOptional()
  destinations?: number[];
}
