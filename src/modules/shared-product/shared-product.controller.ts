import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SharedProductService } from './shared-product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSharedProductRequestDto } from './dto/create-shared-product.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { SharedProductEntity } from './entities/shared-product.entity';

@ApiTags('Shared Product')
@Controller('shared')
export class SharedProductController {
  constructor(private readonly sharedService: SharedProductService) {}

  @UseGuards(AuthGuard('jwt-user'))
  @ApiBearerAuth()
  @Get()
  async getSharedProductList(@Request() req): Promise<any> {
    console.log(req.user);
    return await this.sharedService.findAllByUserId(+req.user.user_id);
  }

  @Get('/get-details/:token')
  async getSharedProductDetail(@Param('token') token: string): Promise<any> {
    return await this.sharedService.getSharedProductDetailFromToken(token);
  }
  @Post('/generate-shared')
  async generateSharedProductToken(
    @Body() createSharedProductRequestDto: CreateSharedProductRequestDto,
  ): Promise<{ shared_token: string }> {
    return this.sharedService.generateSharedProductToken(
      createSharedProductRequestDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.sharedService.remove(id);
  }
}
