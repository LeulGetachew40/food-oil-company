import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Match } from './../validators/match.validator';
export default class SignupDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @MaxLength(50, { message: 'Email should not exceed 50 characters' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Password should be between 8 and 20 characters',
  })
  @Matches(
    new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[\w\W]{8,}$/),
    {
      message:
        'Your password should contain an uppercase letter, a lowercase letter, a digit and a special character',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'This field is required' })
  @Length(8, 20, {
    message: 'Password should be between 8 and 20 characters',
  })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30, {
    message: 'First name cannot be more than 30 characters long',
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, {
    message: 'Last name cannot be more than 30 characters long',
  })
  lastName?: string;

  @IsInt()
  @IsNotEmpty()
  @Min(18)
  @Max(99)
  age: number;
}
