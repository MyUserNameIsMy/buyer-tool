import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClairesStoreService } from './claires-store.service';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UrlDto } from './dto/url.dto';
import { ClairesStoreEntity } from './entities/claires-store.entity';

@ApiTags('Claires store')
@Controller('claires-store')
export class ClairesStoreController {
  constructor(private readonly clairesStoreService: ClairesStoreService) {}

  @Get(':url')
  async get(@Param('url') url: string): Promise<any> {
    return await this.clairesStoreService.get(url);
  }
}
