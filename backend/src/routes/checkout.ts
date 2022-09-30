import { Router } from 'express';
import { body } from 'express-validator';

import {
    createOrder,
    generateCheckoutLink,
    getOrders,
    processMobbexWebhook,
} from '../application/modules/Checkout/CheckoutAPI';
import { validator } from '../middlewares/validation';

const isValidString = (string: any) => typeof string === 'string' && string.length > 1;

const checkoutRouter = Router();

checkoutRouter.get('/orders', getOrders);

checkoutRouter.post(
    '/order',
    [body('amount', 'The sent amount is invalid.').isInt({ min: 1 }), validator],
    createOrder,
);

checkoutRouter.post(
    '/start',
    [
        body('orderId', 'The selected order is invalid.').isUUID(),
        body('customer', 'The customer data is invalid.').custom((customer) => {
            if (customer && customer.email && customer.name && customer.identification) {
                const { email, name, identification } = customer;

                if (!isValidString(email) || !isValidString(name) || !isValidString(identification)) {
                    throw new Error('The customer data is invalid.');
                }
            }

            return true;
        }),
        validator,
    ],
    generateCheckoutLink,
);

checkoutRouter.post('/mobbex-webhook-alert', processMobbexWebhook);

export { checkoutRouter };
