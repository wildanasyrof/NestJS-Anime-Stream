import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from "@nestjs/common";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

@Catch(ZodError, HttpException, Prisma.PrismaClientKnownRequestError)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : 400; // Default to 400 for validation errors
    let message = 'An unknown error occurred';
    let errors: string | undefined;

    // Handle Zod validation errors
    if (exception instanceof ZodError) {
      message = 'Validation error';
      errors = exception.errors.map((err) => `${err.path[0]}: ${err.message}`).join(', ');
    }

    // Handle Prisma unique constraint violation (P2002)
    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2002') {
      message = 'Unique constraint violation';
      const field = exception.meta?.target ? exception.meta.target : 'field';
      errors = `The value for ${field} is already taken.`;
    }

    // Handle HttpException (other NestJS errors)
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'object' && responseBody['message']) {
        message = responseBody['message'];
        errors = responseBody['error'] || undefined;
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
