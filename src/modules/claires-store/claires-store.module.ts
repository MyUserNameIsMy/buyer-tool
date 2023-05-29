import { Module } from '@nestjs/common';
import { ClairesStoreService } from './claires-store.service';
import { ClairesStoreController } from './claires-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClairesStoreEntity } from './entities/claires-store.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClairesStoreEntity]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ClairesStoreController],
  providers: [ClairesStoreService],
})
export class ClairesStoreModule {}
