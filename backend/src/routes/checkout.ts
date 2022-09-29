import { Router } from 'express';
import { body } from 'express-validator';

import { generateCheckoutLink, processMobbexWebhook } from '../application/modules/Checkout/CheckoutAPI';
import { validator } from '../middlewares/validation';

const isValidString = (string: any) => typeof string === 'string' && string.length > 1;

const checkoutRouter = Router();

checkoutRouter.post(
    '/start',
    [
        body('amount', 'The selected amount is invalid.').isInt({ min: 1 }),
        body('customer', 'The customer data is invalid.').custom((customer) => {
            const email = customer.email;
            const name = customer.name;
            const identification = customer.identification;

            if (!email || !name || !identification) {
                throw new Error('The customer data is invalid.');
            }

            if (!isValidString(email) || !isValidString(name) || !isValidString(identification)) {
                throw new Error('The customer data is invalid.');
            }

            return true;
        }),
        validator,
    ],
    generateCheckoutLink,
);

checkoutRouter.post('/mobbex-webhook-alert', processMobbexWebhook);

export { checkoutRouter };
