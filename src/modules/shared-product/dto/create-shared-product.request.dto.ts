import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../../common/dto/product.dto';
import { SharedTokenLivingTimeEnum } from '../../../common/enums/shared-token-living-time.enum';

export class CreateSharedProductRequestDto {
  @ApiProperty()
  product: ProductDto;

  @ApiProperty()
  buyer_price: number;

  @ApiProperty()
  living_time: SharedTokenLivingTimeEnum;
}
