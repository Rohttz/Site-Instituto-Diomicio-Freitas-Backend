import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthLoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const user = (req as any).user;

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      if (user) {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - User: ${user.email} (${user.id})`,
        );
      } else {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - Unauthenticated`,
        );
      }
    });

    next();
  }
} 