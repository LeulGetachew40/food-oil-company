// src/filters/http-exception.filter.ts
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      const message = exception['response']['message'];
      if (message.length === 1) {
        exception.message = message[0];
      } else {
        exception.message = message;
      }
    }

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'An error occurred',
      error: exception.name || 'Internal Server Error',
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
