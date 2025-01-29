import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

@Catch(ZodError, HttpException, Prisma.PrismaClientKnownRequestError)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let status =
      exception instanceof HttpException ? exception.getStatus() : 400; // Default to 400 for validation errors
    let message = 'An unknown error occurred';
    let errors:
      | string
      | { field: string; message: string }[]
      | { field: string; message: string }
      | undefined;

    // Handle Zod validation errors
    if (exception instanceof ZodError) {
      message = 'Validation error';
      errors = exception.errors.map((err) => ({
        field: err.path.join('.'), // Join path segments for nested fields
        message: err.message,
      }));
    }

    // Handle Prisma unique constraint violation (P2002)
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = 409;
        message = 'Unique constraint violation';
        let field = exception.meta?.target ? exception.meta.target : 'field';
        field = field.toString().split('_')[1];
        errors = {
          field: field.toString(),
          message: `${field} already exist.`,
        };
      } else if (exception.code === 'P2025') {
        status = 404;
        message = 'Records not found';
        errors = 'The record you are trying to access does not exist.';
      }
    }

    // Handle HttpException (other NestJS errors)
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'object') {
        message = responseBody['message'] || message;
        errors = responseBody['errors'] || undefined;
      } else {
        message = responseBody as string;
      }
    }

    // Send the response in WebResponse format
    response.status(status).json({
      status: 'error',
      message,
      errors,
    });
  }
}
