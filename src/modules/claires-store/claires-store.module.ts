import { Module } from '@nestjs/common';
import { ClairesStoreService } from './claires-store.service';
import { ClairesStoreController } from './claires-store.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClairesStoreEntity } from './entities/claires-store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClairesStoreEntity]),
    PuppeteerModule.forFeature(),
  ],
  controllers: [ClairesStoreController],
  providers: [ClairesStoreService],
})
export class ClairesStoreModule {}
