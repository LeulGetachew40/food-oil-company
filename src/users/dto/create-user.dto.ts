import UserRole from 'src/schemas/public/UserRole';
import { UsersId, UsersInitializer } from './../../schemas/public/Users';
import { IsEmail } from 'class-validator';
export class CreateUserDto implements UsersInitializer {
  id: UsersId;

  @IsEmail({}, { message: 'Invalid Email Address' })
  readonly email: string;

  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt: Date;
}
