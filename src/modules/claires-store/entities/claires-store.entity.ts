import { Column, Entity } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';

@Entity('claires')
export class ClairesStoreEntity extends RootAbstractEntity {
  @Column()
  product_name: string;

  @Column()
  product_id: string;

  @Column()
  product_url: string;

  @Column()
  standard_price: string;

  @Column()
  sales_price: string;

  @Column({ array: true })
  images: string;
}
