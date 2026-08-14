import type { NextFunction, Request, Response } from "express";

/** 404 handler for unknown routes. */
export function notFound(
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  res.status(404).json({
    ok: false,
    error: "Not found",
  });
}
