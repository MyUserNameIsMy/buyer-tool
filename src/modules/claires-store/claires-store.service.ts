import { BadRequestException, Injectable } from '@nestjs/common';
import { ClairesStoreEntity } from './entities/claires-store.entity';

@Injectable()
export class ClairesStoreService {
  async save(result: any): Promise<any> {
    result = JSON.parse(result);
    await ClairesStoreEntity.delete({});
    const products: ClairesStoreEntity[] = [];
    result.forEach((item) => {
      const product = new ClairesStoreEntity();
      product.product_id = item.product_id;
      product.product_name = item.product_name;
      product.product_url = 'https://www.claires.com' + item.product_url;
      product.sales_price = item.sales_price;
      product.standard_price = item.standard_price;
      product.images = item.images.filter((item) => !!item);
      products.push(product);
    });
    console.log(products);
    try {
      await ClairesStoreEntity.save(products);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return products;
  }
}
