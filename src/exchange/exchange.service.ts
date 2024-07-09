import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import {
  ConvertExchange,
  ExchangeRate,
  ServerResponse,
} from '@/types/api/types';
import { parse } from 'path';

@Injectable()
export class ExchangeService {
  async convertCurrency(
    amount: number,
  ): Promise<ServerResponse<ConvertExchange>> {
    const exchangeRate = await this.fetchExchangeRate();
    console.log("wtffff",parseFloat((exchangeRate.dolar * amount).toFixed(2)));
    return {
      error: false,
      body: {
        message: 'Price conversion',
        payload: {
          bs: parseFloat((exchangeRate.dolar * amount).toFixed(2)),
          euro: parseFloat(((exchangeRate.dolar * amount) / exchangeRate.euro).toFixed(2)),
        },
      },
    };
  }

  private async fetchExchangeRate(): Promise<ExchangeRate> {
    const result = await fetch('https://www.bcv.org.ve/');
    const staticHTML = await result.text();
    const $ = cheerio.load(staticHTML);

    let [currencyExchangeUSD, currencyExchangeEUR] = [
      parseFloat(parseFloat($('#dolar').find('strong').first().text().replace(',', '.')).toFixed(2)),
      parseFloat(parseFloat($('#euro').find('strong').first().text().replace(',', '.')).toFixed(2)),
    ];

    console.log('currencyExchangeUSD:', currencyExchangeUSD);
    console.log('currencyExchangeEUR:', currencyExchangeEUR);

    return {
      dolar: currencyExchangeUSD,
      euro: currencyExchangeEUR,
    };
  }
}
