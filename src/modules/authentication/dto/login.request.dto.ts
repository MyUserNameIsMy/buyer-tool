import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'User Telegram Id',
    example: '860476763',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password Telegram Id',
    example: '860476763',
  })
  @IsNotEmpty()
  password: string;
}
