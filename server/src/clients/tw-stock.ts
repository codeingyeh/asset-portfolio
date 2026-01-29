import dotenv from "dotenv";

import axios from "axios";
import type { StockPrice, StockSymbol } from "./types/type.js";

dotenv.config();

const TW_Stock_API_KEY = process.env.TWSTOCKAPIKEY;

export const getSymbols = async (): Promise<{ data: StockSymbol[] }> => {
  try {
    const { data: TWSENormal } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers?type=EQUITY&exchange=TWSE&isNormal=true`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );
    const { data: TWSEAttention } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers?type=EQUITY&exchange=TWSE&isAttention=true`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );
    const { data: TWSEDisposition } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers?type=EQUITY&exchange=TWSE&isDisposition=true`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );
    const { data: TPExNormal } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers?type=EQUITY&exchange=TPEx&isNormal=true`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );
    const { data: TPExAttention } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers?type=EQUITY&exchange=TPEx&isAttention=true`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );
    const { data: TPExDisposition } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers?type=EQUITY&exchange=TPEx&isDisposition=true`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );

    return {
      data: [
        ...TWSENormal.data,
        ...TWSEAttention.data,
        ...TWSEDisposition.data,
        ...TPExNormal.data,
        ...TPExAttention.data,
        ...TPExDisposition.data,
      ],
    };
  } catch (error) {
    console.error("Error fetching external data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const getPrice = async (symbol: string): Promise<StockPrice> => {
  try {
    const { data } = await axios.get(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/quote/${symbol}`,
      {
        headers: {
          "X-API-KEY": TW_Stock_API_KEY,
        },
      },
    );
    return { price: data.previousClose };
  } catch (error) {
    console.error("Error fetching external data:", error);
    throw new Error("Failed to fetch data");
  }
};
