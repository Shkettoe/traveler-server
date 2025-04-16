import { AppEntity } from 'src/common/base.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORTATION = 'transportation',
  ACCOMODATION = 'accomodation',
  MISC = 'misc',
}

@Entity()
export class Expense extends AppEntity {
  @Column()
  amount: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @ManyToOne(() => Trip, (trip) => trip.expenses, {
    onDelete: 'CASCADE',
  })
  trip: Trip;
}
