import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import SignupDto from './dto/signup-auth.dto';
import LoginDto from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  async signup(signupDto: SignupDto) {
    const salt = await bcrypt.genSalt();
    const { email, firstName, lastName, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return createdUser;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    return 'Big man ting';
  }
}
