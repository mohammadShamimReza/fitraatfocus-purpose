import { Router } from "express";

import { profileRouter } from "./profile.routes";
import { templateRouter } from "./template.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ ok: true, service: "fitraat-studio", version: "v1" });
});

apiRouter.use("/templates", templateRouter);
apiRouter.use("/profiles", profileRouter);
