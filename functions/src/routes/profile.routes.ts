import { Router } from "express";

import * as profileController from "../controllers/profile.controller";
import { optionalAuth, requireAuth } from "../middleware/auth.middleware";

export const profileRouter = Router();

profileRouter.get("/me", requireAuth, profileController.getMine);
profileRouter.patch("/me", requireAuth, profileController.updateMine);
profileRouter.get("/:uid", optionalAuth, profileController.getById);
