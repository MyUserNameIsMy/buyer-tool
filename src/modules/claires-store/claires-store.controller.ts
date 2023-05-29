import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClairesStoreService } from './claires-store.service';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UrlDto } from './dto/url.dto';
import { ClairesStoreEntity } from './entities/claires-store.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

@ApiTags('Claires store')
@Controller('claires-store')
export class ClairesStoreController {
  constructor(
    private readonly clairesStoreService: ClairesStoreService,
    private readonly httpService: HttpService,
  ) {}

  @Get('')
  async get(): Promise<any> {
    const result = await firstValueFrom(
      this.httpService
        .get('http://localhost:3200/api/claires')
        .pipe(map((res) => res.data)),
    );
    return await this.clairesStoreService.save(result);
  }
}
