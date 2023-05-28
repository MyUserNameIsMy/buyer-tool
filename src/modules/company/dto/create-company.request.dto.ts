import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyRequestDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Claires',
  })
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({
    description: 'Company table',
    example: 'claires',
  })
  @IsNotEmpty()
  company_table: string;
}
