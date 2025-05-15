import { Injectable, UnauthorizedException } from '@nestjs/common';
import SignupDto from './dto/signup-auth.dto';
import LoginDto from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthResult = { accessToken: string; userId: string; username: string };
type SignInData = { userId: string; username: string };
// i used email because it is a unique field
type AuthInput = { email: string; password: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const salt = await bcrypt.genSalt();
    const { email, firstName, lastName, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return { userId: createdUser.id, username: createdUser.firstName };
  }

  async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch || !user) {
      // throw the error on the caller of the function
      return null;
    }

    return { userId: user.id, username: user.firstName };
  }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.signIn(user);
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken: token,
      userId: user.userId,
      username: user.username,
    };
  }
}
