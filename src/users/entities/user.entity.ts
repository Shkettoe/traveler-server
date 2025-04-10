import { Exclude } from 'class-transformer';
import { AppEntity } from 'src/common/base.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AppEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];
}
