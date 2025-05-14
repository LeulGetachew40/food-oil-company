import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';
export default class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50, { message: 'Email should not exceed 40 characters' })
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Password should be between 8 and 20 characters',
  })
  readonly password: string;
}
