import { ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol';

@Catch(QueryFailedError)
export class PostgresExceptionFilter implements ExceptionFilter {

    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const postgresError = exception.driverError as DatabaseError;

      switch ( postgresError.code ){
        case '23505':
          response.status(409).json({
            statusCode: 409,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: postgresError.message + ' ' + postgresError.detail,
          });
          break;
        default:
          response.status(500).json({
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: postgresError.message,
          });
          break;
      }
    }

}
