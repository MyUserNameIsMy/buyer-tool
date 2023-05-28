import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyRequestDto } from './dto/create-company.request.dto';
import { CompanyEntity } from './entities/company.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyRequestDto,
  ): Promise<CompanyEntity> {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyService.findAll();
  }
  @Get(':company_table')
  async getProducts(@Param('company_table') company_table: string) {
    return await this.companyService.findProductsByCompanyName(company_table);
  }
}
