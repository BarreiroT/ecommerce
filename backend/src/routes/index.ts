import { Router, Request, Response } from 'express';

import { checkoutRouter } from './checkout';
const router = Router();

router.use('/checkout', checkoutRouter);

router.get('/health-check', (_req: Request, res: Response) => {
    res.status(200).send();
});

export { router };
