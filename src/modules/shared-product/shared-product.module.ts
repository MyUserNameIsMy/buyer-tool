import { Module } from '@nestjs/common';
import { SharedProductService } from './shared-product.service';
import { SharedProductController } from './shared-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedProductEntity } from './entities/shared-product.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedProductEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('APP_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  controllers: [SharedProductController],
  providers: [SharedProductService],
})
export class SharedProductModule {}
