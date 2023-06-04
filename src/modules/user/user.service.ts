import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { AccountStatusEnum } from '../../common/enums/account-status.enum';

@Injectable()
export class UserService {
  async findAll(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async changeStatus(status: AccountStatusEnum, buyer_id: number) {
    const user = await UserEntity.findOne({ where: { id: buyer_id } });
    if (!user) throw new BadRequestException('No such user');
    user.account_status = status;
    try {
      await user.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return user.telegram_id;
  }
}
