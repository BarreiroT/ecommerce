import { config } from 'dotenv';
config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { Application } from './application/application';
import { PostgresSource } from './database';
import { HttpException } from './exceptions/HttpException';
import { router } from './routes';
import { webhookRouter } from './routes/webhook';
import { PostgresEnvironment } from './infrastructure/environment/PostgresEnvironment';

PostgresSource.initialize().then((source) => {
    const app = express();

    const environment = new PostgresEnvironment(source);

    app.locals.application = new Application(environment);

    app.use(express.json());

    app.use('/api/webhook', webhookRouter);

    app.use(
        cors({
            origin: process.env.CLIENT_ORIGIN,
        }),
    );

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
