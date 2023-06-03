import { Column, Entity, ManyToOne } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('shared_products')
export class SharedProductEntity extends RootAbstractEntity {
  @Column()
  token: string;

  @ManyToOne(() => UserEntity, (user) => user.shared_products, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
