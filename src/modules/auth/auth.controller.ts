// src/modules/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDTO, RefreshDto } from '../users/users.dto';
import { SuccessResponseDTO } from '../../responses/successResponse';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { User } from '../../database/entities/User.entity';
import { RequestUser } from '../../decorators/request-user.decorator';
import { RefreshGuard } from '../../guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() data: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SuccessResponseDTO> {
    const { user, accessToken, refreshToken } =
      await this.authService.register(data);
    console.log({ refreshToken });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return new SuccessResponseDTO({ user, accessToken, refreshToken });
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @RequestUser() user: User,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    // @Body() { refresh_token }: RefreshDto,
  ): Promise<SuccessResponseDTO> {
    console.log({ user });
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      user.id,
      req.cookies['refresh_token'],
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return new SuccessResponseDTO({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }
}
