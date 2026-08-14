import type { NextFunction, Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";

import { adminAuth } from "../config/admin";

export type AuthUser = {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
};

export type AuthedRequest = Request & { user?: AuthUser };

function toAuthUser(decoded: DecodedIdToken): AuthUser {
  return {
    uid: decoded.uid,
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture,
  };
}

/**
 * Verifies Firebase ID token from Authorization: Bearer <token>.
 */
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

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await readUser(req);
    if (user) {
      (req as AuthedRequest).user = user;
    }
    next();
  } catch {
    res.status(401).json({
      ok: false,
      error: "Invalid or expired ID token.",
    });
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({
        ok: false,
        error: "Missing or invalid Authorization header.",
      });
      return;
    }

    const idToken = header.slice("Bearer ".length).trim();
    if (!idToken) {
      res.status(401).json({ ok: false, error: "Missing ID token." });
      return;
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    (req as AuthedRequest).user = toAuthUser(decoded);
    next();
  } catch {
    res.status(401).json({
      ok: false,
      error: "Invalid or expired ID token.",
    });
  }
}

export function requireUser(req: Request): AuthUser {
  const user = (req as AuthedRequest).user;
  if (!user) {
    throw new Error("Unauthenticated request.");
  }
  return user;
}
