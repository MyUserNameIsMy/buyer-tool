import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  async findAll(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
}
