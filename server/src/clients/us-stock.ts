import dotenv from "dotenv";

import axios from "axios";
import type { StockPrice, StockSymbol } from "./types/type.js";

dotenv.config();

const US_Stock_API_KEY = process.env.USSTOCKAPIKEY;

export const getSymbols = async (
  keyword: string = "",
): Promise<{ data: StockSymbol[] }> => {
  try {
    const { data } = await axios.get(
      `https://finnhub.io/api/v1/search?q=${keyword}&token=${US_Stock_API_KEY}&exchange=US`,
    );
    return {
      data: data.result.map((prev: any) => {
        return { name: prev.description, symbol: prev.symbol };
      }),
    };
  } catch (error) {
    console.error("Error fetching external data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const getPrice = async (symbol: string): Promise<StockPrice> => {
  try {
    const { data } = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${US_Stock_API_KEY}`,
    );
    return { price: data.c };
  } catch (error) {
    console.error("Error fetching external data:", error);
    throw new Error("Failed to fetch data");
  }
};
