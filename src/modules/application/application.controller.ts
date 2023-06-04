import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { ApplicationEntity } from './entities/application.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangeApplicationStatusRequestDto } from '../user/dto/change-application-status.request.dto';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() createApplicationDto: CreateApplicationRequestDto) {
    return await this.applicationService.create(createApplicationDto);
  }

  @UseGuards(AuthGuard('jwt-user'))
  @ApiBearerAuth()
  @Get()
  async findAllBY(@Request() req): Promise<ApplicationEntity[]> {
    return await this.applicationService.findAll(+req.user.user_id);
  }

  @UseGuards(AuthGuard('jwt-user'))
  @ApiBearerAuth()
  @Patch('change_status/:id')
  async changeStatus(
    @Request() req,
    @Param('id') id: number,
    @Body() applicationStatusDto: ChangeApplicationStatusRequestDto,
  ): Promise<ApplicationEntity> {
    return await this.applicationService.changeApplicationStatus(
      +req.user.user_id,
      id,
      applicationStatusDto.status,
    );
  }
}
