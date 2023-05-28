import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountStatusEnum } from '../../../common/enums/account-status.enum';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountStatusGuard
  extends AuthGuard('jwt-client')
  implements CanActivate
{
  accountStatus: AccountStatusEnum | null = null;

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredAccountStatus =
      this.reflector.getAllAndOverride<AccountStatusEnum>('account_status', [
        context.getHandler,
        context.getClass,
      ]);

    if (
      [AccountStatusEnum.ACTIVE, AccountStatusEnum.INACTIVE].includes(
        requiredAccountStatus,
      )
    )
      this.accountStatus = requiredAccountStatus;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new ForbiddenException();
    }

    if (this.accountStatus !== user.account_status)
      throw new UnauthorizedException();

    return user;
  }
}
