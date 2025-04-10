import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { AbstractService } from 'src/common/abstract.service';
import { Destination } from './entities/destination.entity';
import { QueryDestinationsDto } from './dto/query-destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationsService extends AbstractService<
  QueryDestinationsDto,
  Destination
> {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) {
    super(destinationRepository);
  }

  async create(createDestinationDto: CreateDestinationDto) {
    try {
      const destination =
        this.destinationRepository.create(createDestinationDto);
      return await this.destinationRepository.save(destination);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
