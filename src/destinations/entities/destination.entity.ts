import { AppEntity } from 'src/common/base.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'country'])
export class Destination extends AppEntity {
  @Column()
  name: string;

  @Column()
  country: string;

  @ManyToMany(() => Trip, (trip) => trip.destinations)
  @JoinTable()
  trips: Trip[];
}
