import { validationResult } from 'express-validator';

import { UnprocessableEntity } from '../exceptions/HttpException';
import { Controller } from '../types/Controller';

export const validator: Controller<any> = (req, _res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(new UnprocessableEntity('Validation Failed', errors.array()));
        }

        next();
    } catch (err) {
        next(err);
    }
};
