import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { UserService } from '../user/user.service';

@Module({
  providers: [BotService, BotUpdate, UserService],
})
export class BotModule {}
