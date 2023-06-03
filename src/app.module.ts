import { Module } from '@nestjs/common';
import { ClairesStoreModule } from './modules/claires-store/claires-store.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmAsyncConfig } from './config/orm-async.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CompanyModule } from './modules/company/company.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramAsyncConfig } from './config/telegram-async.config';
import { BotModule } from './modules/bot/bot.module';
import { SharedProductModule } from './modules/shared-product/shared-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(OrmAsyncConfig),
    TelegrafModule.forRootAsync(TelegramAsyncConfig),
    AuthenticationModule,
    ClairesStoreModule,
    UserModule,
    CompanyModule,
    BotModule,
    SharedProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
