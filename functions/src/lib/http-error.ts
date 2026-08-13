export class HttpError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number, code = "internal") {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
  }
}

export function badRequest(message: string): HttpError {
  return new HttpError(message, 400, "invalid-argument");
}

export function unauthorized(message = "You need to sign in first."): HttpError {
  return new HttpError(message, 401, "unauthenticated");
}

export function forbidden(message = "You do not have access to this resource."): HttpError {
  return new HttpError(message, 403, "permission-denied");
}

export function notFound(message = "Not found."): HttpError {
  return new HttpError(message, 404, "not-found");
}
