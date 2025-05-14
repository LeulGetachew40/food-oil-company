import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersId } from 'src/schemas/public/Users';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { PaginateUsersDto } from './dto/pagination-dto';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginateUsersDto): Promise<any> {
    return await this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: UsersId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UsersId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete('all')
  deleteAll() {
    return this.usersService.deleteAll();
  }
  @Delete(':id')
  remove(@Param('id') id: UsersId) {
    return this.usersService.remove(id);
  }
}
