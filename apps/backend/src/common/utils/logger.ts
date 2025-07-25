import { Request } from 'express';

export class AppLogger {
  static info(req: Request, message: string, extra?: object) {
    const correlationId = req['correlationId'] as string;

    console.log(`[INFO] [${correlationId}] ${message}`, extra || '');
  }

  static warn(req: Request, message: string, extra?: object) {
    const correlationId = req['correlationId'] as string;

    console.warn(`[WARN] [${correlationId}] ${message}`, extra || '');
  }

  static error(req: Request, message: string, error?: unknown, extra?: object) {
    const correlationId = req['correlationId'] as string;

    console.error(
      `[ERROR] [${correlationId}] ${message}`,
      error || '',
      extra || '',
    );
  }
}
