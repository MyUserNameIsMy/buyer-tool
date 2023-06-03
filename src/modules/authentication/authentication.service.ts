import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}
  async validate(username: string): Promise<UserEntity> {
    const user = await UserEntity.findOne({
      where: { telegram_id: username },
      select: [
        'id',
        'password',
        'telegram_id',
        'account_status',
        'firstname',
        'lastname',
        'email',
        'phone_number',
      ],
    });

    if (!user || !(await compare(username, user.password))) {
      throw new UnauthorizedException('Password or Username is incorrect!');
    }
    return user;
  }

  async generateToken(user: UserEntity): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(
        {
          user_id: user.id,
          telegram_id: user.telegram_id,
          account_status: user.account_status,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone_number: user.phone_number,
        },
        {
          expiresIn: '3d',
        },
      ),
    };
  }

  async registerUser(userRegisterDto: RegisterUserRequestDto): Promise<any> {
    const user = new UserEntity();
    user.telegram_id = userRegisterDto.telegram_id;
    user.password = userRegisterDto.telegram_id;
    user.firstname = userRegisterDto.firstname;
    user.lastname = userRegisterDto.lastname;
    user.email = userRegisterDto.email;
    user.phone_number = userRegisterDto.phone_number;

    try {
      await user.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return user;
  }
}
