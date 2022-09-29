import { NotValidException } from '../../../exceptions/HttpException';
import { Order } from '../../../models';
import { OrderState } from '../../../models/Order';
import { Customer } from '../../../types/Customer';
import { PaymentEvent } from '../../../types/PaymentEvent';
import { PaymentSystem } from './PaymentSystem';
import { OrderRepository } from './persistence/OrderRepository';

export class CheckoutSystem {
    private orderRepository: OrderRepository;
    private paymentSystem: PaymentSystem;

    constructor(orderRepository: OrderRepository, paymentSystem: PaymentSystem) {
        this.orderRepository = orderRepository;
        this.paymentSystem = paymentSystem;
    }

    createOrder(order: Order) {
        order.state = OrderState.New;

        return this.orderRepository.create(order);
    }

    async findOrderById(orderId: string) {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new NotValidException('This order does not exist.');
        }

        return order;
    }

    async updateOrderState(orderState: OrderState, orderId: string) {
        const updated = await this.orderRepository.updateOrderState(orderState, orderId);

        if (!updated) {
            throw new NotValidException("Couldn't update this order.");
        }

        return updated;
    }

    async startsCheckoutProcess({
        amount,
        description,
        currency,
        customer,
    }: {
        amount: number;
        description: string;
        currency: string;
        customer: Customer;
    }) {
        const order = await this.createOrder({
            amount,
            description,
            currency,
            state: OrderState.New,
        });

        return this.paymentSystem.generateCheckoutLink({
            total: amount,
            description,
            reference: order.id,
            currency: 'ARS',
            customer,
        });
    }

    processCheckoutEvent(event: PaymentEvent) {
        const orderId = event.orderId();

        if (event.isAccepted()) {
            return this.updateOrderState(OrderState.Payed, orderId);
        }

        if (event.isCanceled()) {
            return this.updateOrderState(OrderState.Canceled, orderId);
        }

        if (event.isPending()) {
            return this.updateOrderState(OrderState.Pending, orderId);
        }
    }
}
