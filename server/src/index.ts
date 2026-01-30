import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/route.js";
import cors from "cors";

//http://localhost:3000/api/price?market=US&symbol=NVDA
//http://localhost:3000/api/symbols?market=US&keyword=NVDA
//http://localhost:3000/api/price?market=TW&symbol=0050
//http://localhost:3000/api/symbols?market=TW

const app = express();
const port: number = 3000;
dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
};

app.use(cors(corsOptions));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
