import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception";

export function errorHandler(_error: HttpException, _req: Request, _res: Response, _next: NextFunction) {
  const status = _error.status || 500;
  const message = _error.message || "Erro interno no servidor.";
  _res.status(status).send({ status: status, message: message });
}
