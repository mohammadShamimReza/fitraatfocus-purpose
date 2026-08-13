import { Router } from "express";

import { profileRouter } from "./profile.routes";
import { templateRouter } from "./template.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ data: { ok: true } });
});

apiRouter.use("/templates", templateRouter);
apiRouter.use("/profiles", profileRouter);
