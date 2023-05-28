import { ApiProperty } from '@nestjs/swagger';

export class UrlDto {
  @ApiProperty({
    example: 'https://www.claires.com/us/bags/girls-bags/',
  })
  url: string;
}
