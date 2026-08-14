import type { Request, Response } from "express";

import { asyncHandler } from "../lib/async-handler";
import { badRequest } from "../lib/http-error";
import { paramValue } from "../lib/request";
import { sendData } from "../lib/response";
import { requireUser } from "../middleware/auth.middleware";
import * as profileService from "../services/profile.service";
import { updateProfileSchema } from "../validators/profile.validator";

export const getMine = asyncHandler(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const data = await profileService.getOrCreateMyProfile(
    user.uid,
    user.name || user.email || "User",
    user.picture ?? "",
    user.email ?? "",
  );
  sendData(res, data);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const uid = paramValue(req, "uid");
  if (!uid) {
    throw badRequest("uid is required.");
  }
  sendData(res, await profileService.getPublicProfile(uid));
});

export const updateMine = asyncHandler(async (req: Request, res: Response) => {
  const input = updateProfileSchema.parse(req.body);
  sendData(res, await profileService.updateMyProfile(requireUser(req).uid, input));
});
