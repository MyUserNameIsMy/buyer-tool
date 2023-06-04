import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { AccountStatusEnum } from '../../common/enums/account-status.enum';

@Injectable()
export class BotService {
  constructor(@InjectBot() private bot: Telegraf<Context>) {}
  startButtons(): any {
    return {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Доступ к личному кабинету',
              web_app: { url: 'https://galam.life/login' },
            },
            {
              text: 'Регистрация',
              web_app: { url: 'https://galam.life/register' },
            },
            { text: 'Help', web_app: { url: 'https://galam.life/help' } },
          ],
        ],
      },
    };
  }

  notifyAdminNewUser(message: string, buyer_id: number) {
    this.bot.telegram.sendMessage('860476763', message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Отклонить',
              callback_data: `decline_registration_${buyer_id}`,
            },
            {
              text: 'Принять',
              callback_data: `accept_registration_${buyer_id}`,
            },
          ],
        ],
      },
    });
  }

  async notifyBuyerAboutStatus(status: AccountStatusEnum, telegram_id: string) {
    let message = '';
    if (status === AccountStatusEnum.INACTIVE) message = 'You were declined';
    if (status === AccountStatusEnum.ACTIVE) message = 'You were accepted';
    await this.bot.telegram.sendMessage(telegram_id, message);
  }
}
