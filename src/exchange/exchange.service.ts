import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class ExchangeService {
  async convertCurrency(amount: number): Promise<number> {
    const exchangeRate = await this.fetchExchangeRate();
    return amount * exchangeRate;
  }

  async fetchExchangeRate(): Promise<number> {
    const result = await fetch('https://www.bcv.org.ve/');
    const staticHTML = await result.text();
    const $ = cheerio.load(staticHTML);
    const currencyExchange = $('#dolar').find('strong').first().text();
    return parseFloat(currencyExchange.replace(',', '.'));
  }
}
