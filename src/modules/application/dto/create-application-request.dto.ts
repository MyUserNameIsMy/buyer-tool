import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationRequestDto {
  @ApiProperty()
  buyer_id: number;

  @ApiProperty()
  company_table: string;

  @ApiProperty()
  original_link: string;

  @ApiProperty()
  original_price: string;

  @ApiProperty()
  buyer_price: string;

  @ApiProperty()
  client_fullname: string;

  @ApiProperty()
  client_address: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  size: string;
}
