import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ExchangeRate } from '@/types/api/types';
import { parse } from 'path';

@Injectable()
export class ExchangeService {
  async convertCurrency(amount: number): Promise<ExchangeRate> {
    const exchangeRate = await this.fetchExchangeRate();
    return {
      dolar: exchangeRate.dolar* amount,
      euro: exchangeRate.euro * amount
    };
  }

  async fetchExchangeRate(): Promise<ExchangeRate> {
    const result = await fetch('https://www.bcv.org.ve/');
    const staticHTML = await result.text();
    const $ = cheerio.load(staticHTML);
    console.log("DOLAR", $);
    console.log("html",staticHTML);
    console.log("result", result);
   
    const [currencyExchangeUSD, currencyExchangeEUR] = [
      parseFloat($('#dolar').find('strong').first().text().replace(',','.')),
      parseFloat($('#euro').find('strong').first().text().replace(',','.')),
    ];

    console.log("dolar?",currencyExchangeEUR)
    console.log("euro?", currencyExchangeEUR)

    return {
      dolar: currencyExchangeUSD,
      euro: currencyExchangeEUR,
    };
  }
}
