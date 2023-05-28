import { ConfigService } from '@nestjs/config';
import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
} from 'nestjs-telegraf/dist/interfaces';

export const TelegramAsyncConfig: TelegrafModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (): Promise<TelegrafModuleOptions> => {
    return {
      token: process.env.BOT_TOKEN,
    };
  },
};
