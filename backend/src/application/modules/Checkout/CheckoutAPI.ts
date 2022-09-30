import { Controller } from '../../../types/Controller';
import { Customer } from '../../../types/Customer';
import { MobbexEvent } from '../../../types/Mobbex';
import { Application } from '../../application';
import { MobbexPayment } from './PaymentSystem';

export const generateCheckoutLink: Controller<
    {
        orderId: string;
        customer?: Customer;
    },
    {},
    { redirectUrl: string }
> = async (req, res, next) => {
    try {
        const application: Application = req.app.locals.application;

        const data = req.body;

        const redirectUrl = await application.startCheckoutProcess(data);

        res.status(200).json({ redirectUrl });
    } catch (err) {
        next(err);
    }
};

export const processMobbexWebhook: Controller<MobbexEvent> = async (req, res) => {
    try {
        const application: Application = req.app.locals.application;

        const event = new MobbexPayment(req.body);

        await application.processCheckoutEvent(event);

        res.status(200).send();
    } catch (err) {
        res.status(500).send();
    }
};
