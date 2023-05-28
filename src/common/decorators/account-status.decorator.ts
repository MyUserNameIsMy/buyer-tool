import { AccountStatusEnum } from '../enums/account-status.enum';
import { SetMetadata } from '@nestjs/common';

export const AccountStatusDecorator = (account_status: AccountStatusEnum) =>
  SetMetadata('account_status', account_status);
