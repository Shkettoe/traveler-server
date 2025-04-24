import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: '35.246.201.187',
  /* host: configService.get('DB_HOST'),*/
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  /* database: configService.get('DB_DATABASE'), */
  database: 'travel_planner',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/db/migrations/*{.ts,.js}'],
});
