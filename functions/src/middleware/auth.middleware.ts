import type { NextFunction, Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";

import { adminAuth } from "../config/admin";
import { unauthorized } from "../lib/http-error";

export type AuthUser = {
  uid: string;
  email: string;
  name: string;
  picture: string;
};

export type AuthedRequest = Request & { user: AuthUser };

function toAuthUser(decoded: DecodedIdToken): AuthUser {
  return {
    uid: decoded.uid,
    email: typeof decoded.email === "string" ? decoded.email : "",
    name: typeof decoded.name === "string" ? decoded.name : "",
    picture: typeof decoded.picture === "string" ? decoded.picture : "",
  };
}

async function readUser(req: Request): Promise<AuthUser | undefined> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return undefined;
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return undefined;
  }

  const decoded = await adminAuth.verifyIdToken(token);
  return toAuthUser(decoded);
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await readUser(req);
    if (user) {
      req.user = user;
    }
    next();
  } catch {
    next(unauthorized("Invalid or expired sign-in token."));
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  await optionalAuth(req, res, (error?: unknown) => {
    if (error) {
      next(error);
      return;
    }

    if (!req.user) {
      next(unauthorized());
      return;
    }

    next();
  });
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}
