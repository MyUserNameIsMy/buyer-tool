import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
  startButtons(): any {
    return {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Доступ к личному кабинету',
              web_app: { url: 'https://www.youtube.com/' },
            },
            {
              text: 'Регистрация',
              web_app: { url: 'https://www.youtube.com/' },
            },
            { text: 'Help', web_app: { url: 'https://www.youtube.com/' } },
          ],
        ],
      },
    };
  }
}
