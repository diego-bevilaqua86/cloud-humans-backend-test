import { NextFunction, Request, Response } from 'express';
import { eventTimestamp } from "../functions";

export function consoleLogger(req: Request, _res: Response, next: NextFunction) {
  console.log(`${ eventTimestamp('REQUEST_RECEIVED') } Method: ${ req.method } | Path: ${ req.path }`);
  next();
}
