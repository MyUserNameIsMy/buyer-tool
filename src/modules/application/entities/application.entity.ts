import { Column, Entity, ManyToOne } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { ApplicationStatusEnum } from '../../../common/enums/application-status.enum';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('applications')
export class ApplicationEntity extends RootAbstractEntity {
  @Column()
  company_table: string;

  @Column()
  original_link: string;

  @Column()
  original_price: string;

  @Column()
  buyer_price: string;

  @Column()
  client_fullname: string;

  @Column()
  client_address: string;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatusEnum,
    default: ApplicationStatusEnum.NEW,
  })
  status: ApplicationStatusEnum;

  @ManyToOne(() => UserEntity, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
