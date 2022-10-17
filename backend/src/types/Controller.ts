import { Request, Response, NextFunction } from 'express';

export type DefaultReponse = { message: string };

export type Controller<B = Record<string, unknown>, P = Record<string, unknown>, R = DefaultReponse> = (
    req: Request<P, R, B>,
    res: Response<R>,
    next: NextFunction,
) => void;
