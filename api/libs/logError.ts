import { NextFunction, Response, Request } from "express";
import { CustomError } from "./errorHandler/customError";

function logError(err: CustomError, req: Request, res: Response, next: NextFunction) {
    if(!err.status) {
        console.error(err);
    }
    next(err);
}

export { logError }