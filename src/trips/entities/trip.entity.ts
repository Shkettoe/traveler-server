import { AppEntity } from 'src/common/base.entity';
import { Destination } from 'src/destinations/entities/destination.entity';
import { Expense } from 'src/expenses/entity/expense.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Trip extends AppEntity {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.trips)
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => Destination, (destination) => destination.trips, {
    onDelete: 'CASCADE',
  })
  destinations: Destination[];

  @OneToMany(() => Expense, (expense) => expense.trip, {
    cascade: ['insert', 'update'],
  })
  expenses: Expense[];
}
