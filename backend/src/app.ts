import { config } from 'dotenv';
config();

import express, { NextFunction, Request, Response } from 'express';

import { Application } from './application/application';
import { CheckoutSystem } from './application/modules/Checkout/CheckoutSystem';
import { PaymentSystem } from './application/modules/Checkout/PaymentSystem';
import { PostgresOrderRepository } from './application/modules/Checkout/persistence/PostgresOrderRepository';
import { PostgresSource } from './database';
import { HttpException } from './exceptions/HttpException';
import { router } from './routes';

PostgresSource.initialize().then((source) => {
    const app = express();

    const orderRepository = new PostgresOrderRepository(source);
    const paymentSystem = new PaymentSystem();
    const checkoutSystem = new CheckoutSystem(orderRepository, paymentSystem);

    app.locals.application = new Application(checkoutSystem);

    app.use(express.json());

    app.use('/api', router);

    app.use((error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
        const status = error.statusCode || 500;
        const message = status === 500 ? 'Ha ocurrido un error en el servidor. Vuelve a intentarlo.' : error.message;

        if (status === 500) {
            console.error(error);
        }

        res.status(status).json({ message, errors: error.data });
    });

    app.listen(Number(process.env.PORT), () => console.log(`Application listening on port ${process.env.PORT}`));
});
