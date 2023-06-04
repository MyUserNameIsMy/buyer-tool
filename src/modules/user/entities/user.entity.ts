import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import * as bcrypt from 'bcrypt';
import { AccountStatusEnum } from '../../../common/enums/account-status.enum';
import { SharedProductEntity } from '../../shared-product/entities/shared-product.entity';
import { ApplicationEntity } from '../../application/entities/application.entity';

@Entity('users')
export class UserEntity extends RootAbstractEntity {
  @Column({ unique: true })
  telegram_id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.INACTIVE,
  })
  account_status: AccountStatusEnum;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @OneToMany(
    () => SharedProductEntity,
    (shared_product) => shared_product.user,
    { cascade: true },
  )
  shared_products: SharedProductEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.user, {
    cascade: true,
  })
  applications: ApplicationEntity[];
}
