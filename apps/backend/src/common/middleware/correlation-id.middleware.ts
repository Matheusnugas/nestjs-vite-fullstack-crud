import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const correlationId = randomUUID();
  req['correlationId'] = correlationId;
  res.setHeader('X-Correlation-Id', correlationId);
  next();
}
