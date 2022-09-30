import { Router } from 'express';

import { processMobbexWebhook } from '../application/modules/Checkout/CheckoutAPI';

const webhookRouter = Router();

webhookRouter.post('/mobbex', processMobbexWebhook);

export { webhookRouter };
