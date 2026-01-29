import {
  getPrice as getTwPrice,
  getSymbols as getTwSymbol,
} from "../clients/tw-stock.js";
import {
  getPrice as getUsPrice,
  getSymbols as getUsSymbol,
} from "../clients/us-stock.js";
import type { Request, Response } from "express";

export const stockController = {
  price: async (req: Request, res: Response) => {
    try {
      const symbol = req.query.symbol?.toString().toUpperCase() || "";
      const market = req.query.market?.toString().toUpperCase() || "";
      const data =
        market === "TW" ? await getTwPrice(symbol) : getUsPrice(symbol);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "發生了非預期的錯誤" });
      }
    }
  },
  symbols: async (req: Request, res: Response) => {
    try {
      const keyword = req.query.keyword?.toString() || "";
      const market = req.query.market?.toString().toUpperCase() || "";
      const data = market === "TW" ? await getTwSymbol() : getUsSymbol(keyword);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "發生了非預期的錯誤" });
      }
    }
  },
};
