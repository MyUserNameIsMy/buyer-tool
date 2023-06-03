import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_table: string;

  @ApiProperty()
  product_id: string;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  product_url: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  product_standard_price: string;

  @ApiProperty()
  product_sales_price: string;
}
