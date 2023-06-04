import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationEntity } from './entities/application.entity';
import { ExtractJwt } from 'passport-jwt';
import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;
import { UserEntity } from '../user/entities/user.entity';
import { CompanyEntity } from '../company/entities/company.entity';
import { ApplicationStatusEnum } from '../../common/enums/application-status.enum';

@Injectable()
export class ApplicationService {
  async create(createApplicationDto: CreateApplicationRequestDto) {
    const application = new ApplicationEntity();
    const buyer = await UserEntity.findOne({
      where: { id: createApplicationDto.buyer_id },
    });
    if (!buyer) throw new BadRequestException('No such buyer');

    const company = await CompanyEntity.findOne({
      where: { company_table: createApplicationDto.company_table },
    });
    if (!company) throw new BadRequestException('No such company');

    application.user = buyer;
    application.company_table = company.company_table;
    application.original_link = createApplicationDto.original_link;
    application.original_price = createApplicationDto.original_price;
    application.buyer_price = createApplicationDto.buyer_price;
    application.client_fullname = createApplicationDto.client_fullname;
    application.client_address = createApplicationDto.client_address;
    application.quantity = createApplicationDto.quantity;
    application.size = createApplicationDto.size;

    try {
      await application.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return application;
  }

  async findAll(buyer_id: number): Promise<ApplicationEntity[]> {
    return await ApplicationEntity.find({ where: { user: { id: buyer_id } } });
  }

  async changeApplicationStatus(
    buyer_id: number,
    application_id: number,
    status: ApplicationStatusEnum,
  ): Promise<ApplicationEntity> {
    const application = await ApplicationEntity.findOne({
      where: { user: { id: buyer_id }, id: application_id },
    });
    if (!application) throw new BadRequestException('No such application');

    application.status = status;

    try {
      await application.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return application;
  }
}
