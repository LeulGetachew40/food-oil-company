import UserRole from 'src/schemas/public/UserRole';
import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid Email Address' })
  readonly email: string;

  password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  phone?: string;
  role?: UserRole;
}
