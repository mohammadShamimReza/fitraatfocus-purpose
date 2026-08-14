import type { Request, Response } from "express";

import { asyncHandler } from "../lib/async-handler";
import { badRequest } from "../lib/http-error";
import { paramValue } from "../lib/request";
import { sendData, sendEmpty } from "../lib/response";
import { type AuthedRequest, requireUser } from "../middleware/auth.middleware";
import * as templateService from "../services/template.service";
import {
  createSectionSchema,
  createTaskSchema,
  createTemplateSchema,
  updateSectionSchema,
  updateTaskSchema,
  updateTemplateSchema,
} from "../validators/template.validator";

export const listPublic = asyncHandler(async (req: Request, res: Response) => {
  const creatorId =
    typeof req.query.creatorId === "string" ? req.query.creatorId : undefined;
  const data = creatorId
    ? await templateService.listTemplatesByCreator(creatorId)
    : await templateService.listPublicTemplates();
  sendData(res, data);
});

export const listMine = asyncHandler(async (req: Request, res: Response) => {
  sendData(res, await templateService.listMyTemplates(requireUser(req).uid));
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  sendData(
    res,
    await templateService.getTemplate(templateId, (req as AuthedRequest).user?.uid),
  );
});

export const getPublic = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  sendData(res, await templateService.getPublicTemplate(templateId));
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const input = createTemplateSchema.parse(req.body);
  sendData(res, await templateService.createTemplate(requireUser(req), input), 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  const input = updateTemplateSchema.parse(req.body);
  sendData(
    res,
    await templateService.updateTemplate(requireUser(req).uid, templateId, input),
  );
});

export const publish = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  sendData(
    res,
    await templateService.publishTemplate(requireUser(req).uid, templateId),
  );
});

export const download = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  sendData(
    res,
    await templateService.downloadTemplate(requireUser(req).uid, templateId),
  );
});

export const createSection = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  const input = createSectionSchema.parse(req.body);
  sendData(
    res,
    await templateService.createSection(requireUser(req).uid, templateId, input),
    201,
  );
});

export const updateSection = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  const sectionId = paramValue(req, "sectionId");
  if (!templateId || !sectionId) {
    throw badRequest("templateId and sectionId are required.");
  }
  const input = updateSectionSchema.parse(req.body);
  sendData(
    res,
    await templateService.updateSection(
      requireUser(req).uid,
      templateId,
      sectionId,
      input,
    ),
  );
});

export const deleteSection = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  const sectionId = paramValue(req, "sectionId");
  if (!templateId || !sectionId) {
    throw badRequest("templateId and sectionId are required.");
  }
  await templateService.deleteSection(
    requireUser(req).uid,
    templateId,
    sectionId,
  );
  sendEmpty(res);
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  if (!templateId) {
    throw badRequest("templateId is required.");
  }
  const input = createTaskSchema.parse(req.body);
  sendData(
    res,
    await templateService.createTask(requireUser(req).uid, templateId, input),
    201,
  );
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  const taskId = paramValue(req, "taskId");
  if (!templateId || !taskId) {
    throw badRequest("templateId and taskId are required.");
  }
  const input = updateTaskSchema.parse(req.body);
  sendData(
    res,
    await templateService.updateTask(
      requireUser(req).uid,
      templateId,
      taskId,
      input,
    ),
  );
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const templateId = paramValue(req, "templateId");
  const taskId = paramValue(req, "taskId");
  if (!templateId || !taskId) {
    throw badRequest("templateId and taskId are required.");
  }
  await templateService.deleteTask(requireUser(req).uid, templateId, taskId);
  sendEmpty(res);
});
