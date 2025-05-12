import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { QueryTripsDto } from './dto/query-trip.dto';
import { AbstractService } from 'src/common/abstract.service';
import { Destination } from 'src/destinations/entities/destination.entity';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { Expense } from 'src/expenses/entity/expense.entity';
import { UpdateExpenseDto } from 'src/expenses/dto/update-expense.dto';

@Injectable()
export class TripsService extends AbstractService<QueryTripsDto, Trip> {
  constructor(
    @InjectRepository(Trip) private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {
    super(tripsRepository);
  }

  async create(createTripDto: CreateTripDto) {
    if (createTripDto.startDate > createTripDto.endDate)
      throw new BadRequestException('Start date must be before the end date');
    try {
      const trip = this.tripsRepository.create(createTripDto as Partial<Trip>);
      return await this.tripsRepository.save(trip);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['user', 'destinations', 'expenses'],
    });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    try {
      const { destinations, ...dto } = updateTripDto;
      const trip = await this.findOne(id);

      Object.assign(trip, dto);

      if (destinations)
        trip.destinations = destinations.map((id) => ({ id })) as Destination[];

      return await this.tripsRepository.save(trip);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.tripsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addExpenseToTrip(tripId: number, createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepository.create(createExpenseDto);
    expense.trip = { id: tripId } as Trip;
    return await this.expenseRepository.save(expense);
  }

  async updateExpense(id: number, updateExpenseDto: UpdateExpenseDto) {
    try {
      return await this.expenseRepository.update(id, updateExpenseDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteExpense(id: number) {
    try {
      return await this.expenseRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
