import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { UserService } from '../user/user.service';
import { AccountStatusEnum } from '../../common/enums/account-status.enum';

@Injectable()
@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly userService: UserService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      `Hi ${ctx.message.from.first_name}`,
      this.botService.startButtons(),
    );
  }

  @Action(/decline_registration_(\d+)/)
  async declineRegistration(@Ctx() ctx: Context) {
    const buyer_id = +ctx.callbackQuery['data'].substring(21);
    const telegram_id = await this.userService.changeStatus(
      AccountStatusEnum.INACTIVE,
      buyer_id,
    );
    await ctx.editMessageReplyMarkup(undefined);
    await this.botService.notifyBuyerAboutStatus(
      AccountStatusEnum.INACTIVE,
      telegram_id,
    );
    await ctx.reply('Declined');
  }

  @Action(/accept_registration_\d+/)
  async acceptRegistration(@Ctx() ctx: Context) {
    const buyer_id = +ctx.callbackQuery['data'].substring(20);
    const telegram_id = await this.userService.changeStatus(
      AccountStatusEnum.ACTIVE,
      buyer_id,
    );
    await ctx.editMessageReplyMarkup(undefined);
    await this.botService.notifyBuyerAboutStatus(
      AccountStatusEnum.ACTIVE,
      telegram_id,
    );
    await ctx.reply('Accepted');
  }
}
