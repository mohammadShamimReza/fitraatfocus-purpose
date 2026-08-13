import type { Request, Response } from "express";

import { asyncHandler } from "../lib/async-handler";
import { sendData, sendEmpty } from "../lib/response";
import type { AuthedRequest } from "../middleware/auth.middleware";
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
  const creatorId = typeof req.query.creatorId === "string" ? req.query.creatorId : undefined;
  const data = creatorId
    ? await templateService.listTemplatesByCreator(creatorId)
    : await templateService.listPublicTemplates();
  sendData(res, data);
});

export const listMine = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  sendData(res, await templateService.listMyTemplates(user.uid));
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  sendData(res, await templateService.getTemplate(String(req.params.templateId), req.user?.uid));
});

export const getPublic = asyncHandler(async (req: Request, res: Response) => {
  sendData(res, await templateService.getPublicTemplate(String(req.params.templateId)));
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = createTemplateSchema.parse(req.body);
  sendData(res, await templateService.createTemplate(user, input), 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = updateTemplateSchema.parse(req.body);
  sendData(res, await templateService.updateTemplate(user.uid, String(req.params.templateId), input));
});

export const publish = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  sendData(res, await templateService.publishTemplate(user.uid, String(req.params.templateId)));
});

export const download = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  sendData(res, await templateService.downloadTemplate(user.uid, String(req.params.templateId)));
});

export const createSection = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = createSectionSchema.parse(req.body);
  sendData(res, await templateService.createSection(user.uid, String(req.params.templateId), input), 201);
});

export const updateSection = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = updateSectionSchema.parse(req.body);
  sendData(
    res,
    await templateService.updateSection(user.uid, String(req.params.templateId), String(req.params.sectionId), input),
  );
});

export const deleteSection = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  await templateService.deleteSection(user.uid, String(req.params.templateId), String(req.params.sectionId));
  sendEmpty(res);
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = createTaskSchema.parse(req.body);
  sendData(res, await templateService.createTask(user.uid, String(req.params.templateId), input), 201);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = updateTaskSchema.parse(req.body);
  sendData(
    res,
    await templateService.updateTask(user.uid, String(req.params.templateId), String(req.params.taskId), input),
  );
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  await templateService.deleteTask(user.uid, String(req.params.templateId), String(req.params.taskId));
  sendEmpty(res);
});
