import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { AppLogger } from '../utils/logger';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { correlationId?: string }>();

    let status = 400;
    let message = 'Database error';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = 409;
          message = 'Resource already exists (unique constraint failed)';
          break;
        case 'P2025':
          status = 404;
          message = 'Resource not found';
          break;
        default:
          message = exception.message;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = 400;
      message = 'Invalid data for database operation';
    }

    AppLogger.error(request, 'PrismaException', exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      correlationId: request.correlationId,
    });
  }
}
