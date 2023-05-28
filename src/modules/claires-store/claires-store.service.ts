import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectContext } from 'nest-puppeteer';
import type { BrowserContext } from 'puppeteer';
import { ClairesStoreEntity } from './entities/claires-store.entity';

@Injectable()
export class ClairesStoreService {
  constructor(
    @InjectContext() private readonly browserContext: BrowserContext,
  ) {}

  async get(url: string): Promise<any> {
    const page = await this.browserContext.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    // await page.waitForNetworkIdle({ idleTime: 250 });
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    const result = await page.evaluate(() => {
      const products = [];
      document.querySelectorAll('li.grid-tile').forEach((product) => {
        const data = {
          product_id: product
            .querySelector('div.product-tile')
            ?.getAttribute('data-itemid'),
          product_name: product.querySelector('div.product-name')?.textContent,
          product_url: product
            .querySelector('a.link-wrap.thumb-link')
            ?.getAttribute('href'),
          product_pricing: {
            standard_price: product.querySelector('span.product-standard-price')
              ?.textContent,
            sales_price: product.querySelector('span.product-sales-price')
              ?.textContent,
          },
          product_promo: {
            promotional_message: product.querySelector(
              'div.promotional-message',
            )?.textContent,
          },
          images: [
            product
              .querySelector(
                'a.link-wrap.thumb-link div.product-image div.thumb-link.rollover div.card div.front.face',
              )
              ?.querySelector('img')
              .getAttribute('data-src') ||
              product
                .querySelector(
                  'a.link-wrap.thumb-link div.product-image div.thumb-link.rollover div.card div.front.face',
                )
                ?.querySelector('img').src,
            product
              .querySelector(
                'a.link-wrap.thumb-link div.product-image div.thumb-link.rollover div.card div.back.face',
              )
              ?.querySelector('img')
              .getAttribute('data-src') ||
              product
                .querySelector(
                  'a.link-wrap.thumb-link div.product-image div.thumb-link.rollover div.card div.back.face',
                )
                ?.querySelector('img').src,
          ],
        };
        products.push(data);
      });

      return products;
    });

    await ClairesStoreEntity.delete({});
    const products: ClairesStoreEntity[] = [];
    result.forEach((item) => {
      const product = new ClairesStoreEntity();
      product.product_id = item.product_id;
      product.product_name = item.product_name;
      product.product_url = 'https://www.claires.com' + item.product_url;
      product.sales_price = item.product_pricing.sales_price;
      product.standard_price = item.product_pricing.standard_price;
      product.images = item.images.filter((item) => !!item);
      products.push(product);
    });
    console.log(products);
    try {
      await ClairesStoreEntity.save(products);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    await this.browserContext.close();

    return products;
  }
}
