import { Injectable } from '@nestjs/common';
import { CreateCompanyRequestDto } from './dto/create-company.request.dto';
import { CompanyEntity } from './entities/company.entity';
import { dataSource } from '../../config/orm-migration.config';
import { DataSource, getConnection, getRepository } from 'typeorm';

@Injectable()
export class CompanyService {
  async create(
    createCompanyDto: CreateCompanyRequestDto,
  ): Promise<CompanyEntity> {
    const company = new CompanyEntity();
    company.company_name = createCompanyDto.company_name;
    company.company_table = createCompanyDto.company_table;
    return await company.save();
  }

  async findAll(): Promise<CompanyEntity[]> {
    return await CompanyEntity.find();
  }

  async findProductsByCompanyName(company_table: string) {
    console.log(company_table);
    await dataSource.initialize();
    const products = await dataSource.query(`SELECT*FROM ${company_table}`);
    await dataSource.destroy();
    return products;
  }
}
