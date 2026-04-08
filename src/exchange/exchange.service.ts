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
    const response = await fetch('https://ve.dolarapi.com/v1/cotizaciones');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    let dolarAPI: number = 0;
    let euroAPI: number = 0;
    result.map((item) => {
      if (item.moneda === 'USD' && item.fuente === 'oficial') {
        dolarAPI = item.promedio;
      }
      if (item.moneda === 'EUR' && item.fuente === 'oficial') {
        euroAPI = item.promedio;
      }
    });
    
    return {
      dolar: dolarAPI,
      euro: euroAPI,
    };
  }
}
