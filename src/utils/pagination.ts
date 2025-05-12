import {
  paginator,
  PaginatorTypes,
  searchPaginator,
} from '@nodeteam/nestjs-prisma-pagination';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import {
  VariableProperties,
  searchValueType,
} from './../types/pagination.types';

export const paginate: PaginatorTypes.PaginateFunction = paginator({
  page: 1,
  perPage: 10,
});

export const searchPaginate: PaginatorTypes.SearchPaginateFunction =
  searchPaginator({
    page: 1,
    perPage: 10,
  });

enum SortDirection {
  DES = 'DES',
  ASC = 'ASC',
}
export class PaginationDto {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  limit?: number = 10;

  properties?: VariableProperties<searchValueType>;
  sorting?: VariableProperties<string>;

  @IsOptional()
  sort_by: string = 'created_at';

  @IsEnum(SortDirection, {
    message: 'sort_direction must be either DES or ASC',
  })
  @IsOptional()
  sort_direction?: SortDirection = SortDirection.DES;
}
