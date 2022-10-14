import { Router, Request, Response } from 'express';

import { checkoutRouter } from './checkout';
import { productRouter } from './product';
const router = Router();

router.use('/checkout', checkoutRouter);

router.use(productRouter);

router.get('/health-check', (_req: Request, res: Response) => {
    res.status(200).send();
});

export { router };
