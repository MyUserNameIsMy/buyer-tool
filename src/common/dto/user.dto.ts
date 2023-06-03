import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export class UserDto {
  @ApiProperty()
  telegram_id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}
