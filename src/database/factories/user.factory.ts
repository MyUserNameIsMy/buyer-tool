import { UserEntity } from '../../modules/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.firstname = faker.name.firstName();
  user.lastname = faker.name.lastName();
  user.email = faker.internet.email();
  user.phone_number = faker.phone.number();
  user.telegram_id = faker.datatype
    .number({ min: 100000000, max: 999999999 })
    .toString();
  user.password = user.telegram_id;
  return user;
});
