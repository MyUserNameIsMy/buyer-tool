import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSharedProductRequestDto } from './dto/create-shared-product.request.dto';
import { SharedProductEntity } from './entities/shared-product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class SharedProductService {
  constructor(private readonly jwtService: JwtService) {}

  async findAllByUserId(user_id: number): Promise<SharedProductEntity[]> {
    return await SharedProductEntity.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });
  }

  async getSharedProductDetailFromToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new BadRequestException({
        description: `Invalid Token. ${e.message}`,
      });
    }

    return this.jwtService.decode(token);
  }
  async generateSharedProductToken(
    buyer_id: number,
    createSharedProductDto: CreateSharedProductRequestDto,
  ): Promise<{ shared_token: string }> {
    const shared_product = new SharedProductEntity();

    const user = await UserEntity.findOne({ where: { id: buyer_id } });
    if (!user) throw new BadRequestException('No such user!');

    shared_product.user = user;

    const token = this.jwtService.sign(
      {
        user: {
          telegram_id: user.telegram_id,
          email: user.email,
          phone_number: user.phone_number,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        product: createSharedProductDto.product,
        buyer_price: createSharedProductDto.buyer_price,
      },
      {
        expiresIn: createSharedProductDto.living_time,
      },
    );
    shared_product.token = token;

    if (!(await shared_product.save()))
      throw new BadRequestException(
        'Server error while saving shared product!',
      );

    return { shared_token: token };
  }

  async remove(id: number): Promise<{ message: string }> {
    if (!(await SharedProductEntity.delete({ id: id })))
      throw new BadRequestException(
        `Can not delete shared product with id ${id}`,
      );

    return { message: 'success' };
  }
}
