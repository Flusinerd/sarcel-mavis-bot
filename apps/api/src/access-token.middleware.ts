import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    // Try to get the access token from the request header
    const accessToken = AccessTokenMiddleware.getAccessToken(req);

    // If the access token is found, set it on the request object
    if (accessToken) {
      req.user = accessToken;
    }

    next();
  }

  private static getAccessToken(req: Request) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return null;
    }
    const parts = authorization.split(' ');
    if (parts.length !== 2) {
      return null;
    }
    const scheme = parts[0];
    const credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
    return null;
  }
}
