import { Module } from '@nestjs/common';
import { SharedProductService } from './shared-product.service';
import { SharedProductController } from './shared-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedProductEntity } from './entities/shared-product.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SharedProductEntity])],
  controllers: [SharedProductController],
  providers: [SharedProductService, JwtService],
})
export class SharedProductModule {}
