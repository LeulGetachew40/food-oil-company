import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from 'src/utils/pagination';
import { ApiProperty } from '@nestjs/swagger';
import UserRole from 'src/schemas/public/UserRole';

export class PaginateUsersDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'A query parameter for searching users by role',
    examples: ['CUSTOMER', 'ADMIN', 'DELIVERY_PERSON'],
  })
  role?: UserRole;
}
