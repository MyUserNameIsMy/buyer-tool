import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatusEnum } from '../../../common/enums/application-status.enum';

export class ChangeApplicationStatusRequestDto {
  @ApiProperty({
    example: ApplicationStatusEnum.ORDERED,
  })
  status: ApplicationStatusEnum;
}
