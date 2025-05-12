import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaClient, Logger],
})
export class UsersModule {}
