import type { Request, Response } from "express";

import { asyncHandler } from "../lib/async-handler";
import { sendData } from "../lib/response";
import type { AuthedRequest } from "../middleware/auth.middleware";
import * as profileService from "../services/profile.service";
import { updateProfileSchema } from "../validators/profile.validator";

export const getMine = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const data = await profileService.getOrCreateMyProfile(user.uid, user.name || user.email || "Creator", user.picture);
  sendData(res, data);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const data = await profileService.getPublicProfile(String(req.params.uid));
  sendData(res, data);
});

export const updateMine = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthedRequest;
  const input = updateProfileSchema.parse(req.body);
  const data = await profileService.updateMyProfile(user.uid, input);
  sendData(res, data);
});
