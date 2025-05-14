import UserRole from 'src/schemas/public/UserRole';
import { UsersId, UsersInitializer } from './../../schemas/public/Users';
import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto implements UsersInitializer {
  id: UsersId;

  @IsEmail({}, { message: 'Invalid Email Address' })
  readonly email: string;

  password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  phone?: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt: Date;
}
