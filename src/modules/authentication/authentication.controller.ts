import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginRequestDto } from './dto/login.request.dto';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(AuthGuard('user'))
  @Post('login')
  @ApiBody({
    type: LoginRequestDto,
  })
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return this.authService.generateToken(req.user);
  }

  @Post('register/user')
  async registerSuperAdmin(
    @Body() registerUserDto: RegisterUserRequestDto,
  ): Promise<any> {
    return this.authService.registerUser(registerUserDto);
  }
}
