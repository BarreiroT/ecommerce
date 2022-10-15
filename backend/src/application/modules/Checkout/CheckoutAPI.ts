import { Order } from '../../../models';
import { OrderProduct } from '../../../models/OrderProduct';
import { Controller } from '../../../types/Controller';
import { Customer } from '../../../types/Customer';
import { MobbexPayment, MobbexEvent } from '../../../types/Mobbex';
import { Persisted } from '../../../types/Persisted';
import { Application } from '../../application';

export const createOrder: Controller<
    {
        products: OrderProduct[];
    },
    {},
    { order: Persisted<Order> }
> = async (req, res, next) => {
    try {
        const application: Application = req.app.locals.application;

        const products = req.body.products;

        const order = await application.createOrder(products);

        res.status(200).json({ order });
    } catch (err) {
        next(err);
    }
};

export const getOrders: Controller<{}, {}, { orders: Persisted<Order>[] }> = async (req, res, next) => {
    try {
        const application: Application = req.app.locals.application;

        const orders = await application.getOrders();

        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};

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
