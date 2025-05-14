import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { UsersId } from 'src/schemas/public/Users';

import UserRole from 'src/schemas/public/UserRole';
import { paginate } from 'src/utils/pagination';
import { PaginateUsersDto } from './dto/pagination-dto';

@Injectable()
export class UsersService {
  private isValidUserRole(role: UserRole | undefined): boolean {
    // if (!role) return false;
    const validRoles = Object.values(UserRole);

    return validRoles.includes(role);
  }
  constructor(
    private readonly prisma: PrismaClient,
    private readonly logger: Logger,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll({ limit, page, role }: PaginateUsersDto) {
    if (role) {
      if (!this.isValidUserRole(role)) {
        throw new HttpException(
          'Invalid User Role. User Must be either CUSTOMER, ADMIN OR DELIVERY_PERSON',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return await paginate(
      this.prisma.user,
      { where: { role } },
      { page, perPage: limit },
    );
  }

  findOne(id: UsersId) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // strip properties like id and such
  async update(id: UsersId, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found!');

    this.logger.log(updateUserDto);

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: updateUserDto,
    });

    return updatedUser;
  }
  async remove(id: UsersId) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async deleteAll() {
    return await this.prisma.user.deleteMany();
  }
}
