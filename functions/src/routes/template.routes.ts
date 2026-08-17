import { Router } from "express";

import * as templateController from "../controllers/template.controller";
import { optionalAuth, requireAuth } from "../middleware/auth.middleware";

export const templateRouter = Router();

templateRouter.get("/", optionalAuth, templateController.listPublic);
templateRouter.get("/me", requireAuth, templateController.listMine);
templateRouter.post("/", requireAuth, templateController.create);
templateRouter.get("/:templateId/public", optionalAuth, templateController.getPublic);
templateRouter.get("/:templateId", optionalAuth, templateController.getOne);
templateRouter.patch("/:templateId", requireAuth, templateController.update);
templateRouter.delete("/:templateId", requireAuth, templateController.remove);
templateRouter.post("/:templateId/publish", requireAuth, templateController.publish);
templateRouter.post("/:templateId/download", requireAuth, templateController.download);
templateRouter.post("/:templateId/sections", requireAuth, templateController.createSection);
templateRouter.post(
  "/:templateId/sections/reorder",
  requireAuth,
  templateController.reorderSections,
);
templateRouter.patch("/:templateId/sections/:sectionId", requireAuth, templateController.updateSection);
templateRouter.delete("/:templateId/sections/:sectionId", requireAuth, templateController.deleteSection);
templateRouter.post("/:templateId/tasks", requireAuth, templateController.createTask);
templateRouter.post(
  "/:templateId/tasks/reorder",
  requireAuth,
  templateController.reorderTasks,
);
templateRouter.patch("/:templateId/tasks/:taskId", requireAuth, templateController.updateTask);
templateRouter.delete("/:templateId/tasks/:taskId", requireAuth, templateController.deleteTask);
