import { PartialType } from '@nestjs/swagger';
import { CreateApplicationRequestDto } from './create-application-request.dto';

export class UpdateApplicationDto extends PartialType(
  CreateApplicationRequestDto,
) {}
