import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { Request } from 'express';
import { IsPublic } from './decorators/is-public.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RegistrationInterceptor } from './interceptors/registration.interceptor';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: SignInDto })
  @IsPublic()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request & { user: User }) {
    return this.authService.signToken({
      email: req.user.email,
      userId: req.user.id,
    });
  }

  @Get('me')
  async profile(@Req() req: Request & { user: { userId: number } }) {
    return await this.usersService.findOne(req.user.userId);
  }

  @ApiBody({ type: CreateUserDto })
  @Post('register')
  @UseInterceptors(RegistrationInterceptor)
  @IsPublic()
  register(@Req() req: Request & { user: User }) {
    return this.authService.signToken({
      email: req.user.email,
      userId: req.user.id,
    });
  }
}
