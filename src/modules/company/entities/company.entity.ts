import { Column, Entity } from 'typeorm';
import { RootAbstractEntity } from '../../../database/entities/root-abstract.entity';

@Entity('companies')
export class CompanyEntity extends RootAbstractEntity {
  @Column()
  company_name: string;

  @Column()
  company_table: string;
}
