import { Request, Response, NextFunction } from 'express';

export type DefaultReponse = { message: string };

export type Controller<B, P = {}, R = DefaultReponse> = (
    req: Request<P, {}, B>,
    res: Response<R>,
    next: NextFunction,
) => void;
