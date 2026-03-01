import express, { type Request, type Response } from "express"; // Regular import
import type { Express } from "express"; // Type-only import
import apiRouter from "./router/index";

import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = 4000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
  res.send("running trial");
});

app.use("/api/v1", apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
