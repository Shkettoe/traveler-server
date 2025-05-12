import { Injectable } from '@nestjs/common';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

interface AbstractQueryDto {
  relations?: string[];
  limit?: number;
  page?: number;
  order?: string;
  orderBy?: string;
  [key: string]: any;
}

@Injectable()
export abstract class AbstractService<
  Dto extends AbstractQueryDto,
  Entity extends ObjectLiteral,
> {
  constructor(private readonly repository: Repository<Entity>) {}

  async find(queryDto: Dto) {
    const { relations, limit, order, orderBy, page, ...where } = queryDto;
    return await this.repository.find({
      where: where as FindOptionsWhere<Entity>,
      relations,
      order: {
        [orderBy || 'createdAt']: order || 'DESC',
      } as FindOptionsOrder<Entity>,
      take: limit,
      skip: ((page || 1) - 1) * (limit || 0),
    });
  }
}
