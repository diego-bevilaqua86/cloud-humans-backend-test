import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { eventTimestamp, isNullOrUndefined } from "../functions";

export function bodyValidator(type: any): RequestHandler {
  return (_req: Request, _res: Response, _next: NextFunction) => {
    validate(plainToClass(type, _req.body, { excludeExtraneousValues: true }))
        .then((errors: ValidationError[]) => {
          if (!isNullOrUndefined(errors) && errors.length > 0) {
            const message = errors
                .map((error: ValidationError) => error.constraints && Object.values(error.constraints))
                .join(", ");
            _next(new HttpException(400, message));
          } else {
            _next();
          }
        }).catch((error) => {
          console.error(`${ eventTimestamp("VALIDATION_EXCEPTION") } Error when performing validation of request body: `);
          console.error(error);
          _next(new HttpException(500, "Erro interno durante validação dos dados da requisição."));
        });
  };
}
