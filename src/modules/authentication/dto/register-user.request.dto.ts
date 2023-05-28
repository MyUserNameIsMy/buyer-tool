import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterUserRequestDto {
  @ApiProperty({
    description: 'The email address of the User',
    example: '00000000',
  })
  @IsNotEmpty()
  telegram_id: string;

  @ApiProperty({
    description: 'Firstname',
    example: 'Magic',
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Extra',
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'Email',
    example: 'email@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Email',
    example: '87761694243',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
