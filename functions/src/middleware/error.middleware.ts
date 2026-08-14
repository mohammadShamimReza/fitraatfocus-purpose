import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { HttpError } from "../lib/http-error";

/** Central error handler for the Express API. */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    const message = err.issues[0]?.message ?? "Invalid request.";
    res.status(400).json({
      ok: false,
      error: message,
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      ok: false,
      error: err.message,
    });
    return;
  }

  console.error("[studio]", err);

  // Never leak internal exception details to clients.
  res.status(500).json({
    ok: false,
    error: "Internal server error",
  });
}
