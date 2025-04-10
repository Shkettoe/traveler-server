import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { QueryDestinationsDto } from './dto/query-destination.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @IsPublic()
  findAll(@Query() queryDestinationsDto: QueryDestinationsDto) {
    return this.destinationsService.find(queryDestinationsDto);
  }
}
