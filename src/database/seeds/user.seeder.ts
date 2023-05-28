import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { AccountStatusEnum } from '../../common/enums/account-status.enum';

export default class UserSeeder implements Seeder {
  async run(
    datasource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = await factoryManager.get(UserEntity);
    const user = await userFactory.save({
      telegram_id: '860476763',
      password: '860476763',
      account_status: AccountStatusEnum.ACTIVE,
    });

    await user.save();
  }
}
