import cors from "cors";
import express from "express";

import { errorMiddleware } from "./middleware/error.middleware";
import { apiRouter } from "./routes";

export const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));
app.use(apiRouter);
app.use((_req, res) => {
  res.status(404).json({ error: "Not found.", code: "not-found" });
});
app.use(errorMiddleware);
